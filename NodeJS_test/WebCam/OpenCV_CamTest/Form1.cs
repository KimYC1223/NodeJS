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

namespace OpenCV_CamTest
{
	public partial class Form1 : Form
	{
		IplImage m_cvImg;
		CvCapture m_cvCap;

        bool isSending = false;

		public Form1()
		{
			InitializeComponent();
		}

		private void Form1_Load(object sender, EventArgs e)
		{
			m_cvCap = CvCapture.FromCamera(0);
			m_cvCap.FrameWidth = 472;
            m_cvCap.FrameHeight = 240;

			//타이머 설정
			timer1.Interval = 120;
			timer1.Enabled = true;
        }

        

		private void timer1_Tick(object sender, EventArgs e)
		{
			//카메라에서 프레임 가져온다.
			m_cvImg = m_cvCap.QueryFrame();
            //IplImage을 비트맵으로 전환
            pictureBox1.Image = m_cvImg.ToBitmap();

            if (!isSending) return;

            UdpClient cli = new UdpClient();
            string serverIp = IpBox.Text;
            string portStr = PortBox.Text;
            int port = Int32.Parse(portStr);

            byte[] sendingData = converterDemo(pictureBox1.Image);
            int dataLen = sendingData.Length / 1472;
            int remain = sendingData.Length % 1472;
            label6.Text = sendingData.Length.ToString() + " ... " + dataLen + " / " + remain;

            for (int i = 0; i <= dataLen; i++) {
                if ( i == dataLen) {
                    if ( remain != 0) {
                        byte[] datagram = new byte[remain];
                        Buffer.BlockCopy(sendingData,1472 * i, datagram,0 ,remain);
                        cli.Send(datagram, datagram.Length, serverIp, port);
                    }
                }else {
                    byte[] datagram = new byte[1472];
                    Buffer.BlockCopy(sendingData, 1472 * i, datagram, 0, 1472);
                    cli.Send(datagram, datagram.Length, serverIp, port);
                }
            }
        }

        
        private void SendBtn_Click(object sender, EventArgs e) {
            isSending = !isSending;
            label5.Text = (isSending)? "연결대기":"송신중";
            SendBtn.Text = (isSending) ? "중지" : "전송";
        }

        public static byte[] converterDemo(Image x) {
            ImageConverter _imageConverter = new ImageConverter();
            byte[] xColor = (byte[])_imageConverter.ConvertTo(x, typeof(byte[]));
            return xColor;
        }

        private void Timer2_Tick_1(object sender, EventArgs e) {
            SendBtn_Click(sender, e);
        }

        private void Label3_Click(object sender, EventArgs e) {

        }
    }
}
