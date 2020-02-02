using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;
using System.Net.Sockets;
using System.Drawing.Imaging;
using OpenCvSharp;
using System.IO;

namespace OpenCV_CamTest
{
	public partial class Form1 : Form
	{
		IplImage m_cvImg;
        CvCapture m_cvCap;
        TcpClient cli;
        NetworkStream stream = null;

        bool isSending = false;

		public Form1()
		{
			InitializeComponent();
		}

		private void Form1_Load(object sender, EventArgs e)
		{
			m_cvCap = CvCapture.FromCamera(0);

            m_cvCap.FrameWidth = 10;
            m_cvCap.FrameHeight = 20;

            //m_cvCap.FrameWidth = 10;
            //m_cvCap.FrameHeight = 20;


            //타이머 설정
            timer1.Interval = 100;
			timer1.Enabled = true;
        }

        

		private void timer1_Tick(object sender, EventArgs e)
		{
			//카메라에서 프레임 가져온다.
			m_cvImg = m_cvCap.QueryFrame();
            //IplImage을 비트맵으로 전환
            pictureBox1.Image = m_cvImg.ToBitmap();

            if (!isSending && cli == null) return;

            try {
                byte[] sendingData = JPEPByteArray(pictureBox1.Image);
                label6.Text = "JPEG Byte : " + sendingData.Length;

                int dataLen = sendingData.Length / 1472;
                int remain = sendingData.Length % 1472;
                //label6.Text = sendingData.Length.ToString() + " ... " + dataLen + " / " + remain;
                //stream.Write(sendingData, 0, sendingData.Length);

                UdpClient cli = new UdpClient();

                for (int i = 0; i <= dataLen; i++) {
                    if (i == dataLen) {
                           
                        if (remain != 0) {
                            byte[] datagram = new byte[remain]; 
                            Buffer.BlockCopy(sendingData, 1472 * i, datagram, 0, remain);
                            cli.Send(datagram, datagram.Length, IpBox.Text, 15001);
                        }
                    }else {
                        byte[] datagram = new byte[1472];
                        Buffer.BlockCopy(sendingData, 1472 * i, datagram, 0, 1472);
                        cli.Send(datagram, datagram.Length, IpBox.Text, 15001);
                        }
                    }

            } catch (System.InvalidOperationException) {
                //isSending = false;
                //label5.Text = "연결대기";
                //SendBtn.Text = "전송";
                //isLocalhost.Enabled = true;
                //if (stream != null) stream.Close();
                //cli.Close(); cli = null;
                //label6.Text = "호스트와 연결 할 수 없습니다.";
            } catch (System.IO.IOException) {
                //isSending = false;
                //label5.Text = "연결대기";
                //SendBtn.Text = "전송";
                //isLocalhost.Enabled = true;
                //if (stream != null) stream.Close();
                //cli.Close(); cli = null;
                //label6.Text = "호스트와 연결 할 수 없습니다.";
            }

        }

        public byte[] JPEPByteArray(Image image) {
            using (MemoryStream memoryStream = new MemoryStream()) {
                image.Save(memoryStream, ImageFormat.Jpeg);
                byte[] returnByte = new byte[memoryStream.Length];
                memoryStream.Seek(0, SeekOrigin.Begin);
                memoryStream.Read(returnByte, 0, returnByte.Length);
                return returnByte;
            }
        }

        private void SendBtn_Click(object sender, EventArgs e) {
            isSending = !isSending;
            label5.Text = (isSending)? "연결대기":"송신중";
            SendBtn.Text = (isSending) ? "중지" : "전송";
            isLocalhost.Enabled = !isSending;

            //if (isSending)
            //    try {
            //        cli = new TcpClient(IpBox.Text, Int32.Parse(PortBox.Text));
            //        stream = cli.GetStream();
            //    } catch (SocketException) {
            //        isSending = false;
            //        label5.Text = "연결대기";
            //        SendBtn.Text = "전송";
            //        isLocalhost.Enabled = true;
            //        label6.Text = "호스트와 연결 할 수 없습니다.";
            //    }
            //else { if (stream != null) stream.Close(); cli.Close(); cli = null; }
        }

        private void Timer2_Tick_1(object sender, EventArgs e) {
            SendBtn_Click(sender, e);
        }

        private void Label3_Click(object sender, EventArgs e) {

        }

        private string tempString;
        private void isLocalhost_CheckedChanged(object sender, EventArgs e) {
            if (isLocalhost.Checked) {
                tempString = IpBox.Text;
                IpBox.Text = "127.0.0.1";
                IpBox.Enabled = false;
            } else {
                IpBox.Text = tempString;
                IpBox.Enabled = true;
            }
        }
    }
}
