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
using OpenCvSharp;

namespace OpenCV_CamTest
{
	public partial class Form1 : Form
	{
		IplImage m_cvImg;
		CvCapture m_cvCap;

		public Form1()
		{
			InitializeComponent();
		}

		private void Form1_Load(object sender, EventArgs e)
		{
			m_cvCap = CvCapture.FromCamera(0);
			m_cvCap.FrameWidth = 200;
			m_cvCap.FrameHeight = 112;

			//타이머 설정
			timer1.Interval = 20;
			timer1.Enabled = true;

            timer2.Interval = 200;
            timer2.Enabled = true;
        }

		private void timer1_Tick(object sender, EventArgs e)
		{
			//카메라에서 프레임 가져온다.
			m_cvImg = m_cvCap.QueryFrame();
			//IplImage을 비트맵으로 전환
			pictureBox1.Image = m_cvImg.ToBitmap();
		}

        private void SendBtn_Click(object sender, EventArgs e) {
            UdpClient cli = new UdpClient();
            string serverIp = IpBox.Text;
            string portStr = PortBox.Text;
            int port = Int32.Parse(portStr);
            byte[] datagram = converterDemo(pictureBox1.Image);
            cli.Send(datagram, datagram.Length, serverIp, port);
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
