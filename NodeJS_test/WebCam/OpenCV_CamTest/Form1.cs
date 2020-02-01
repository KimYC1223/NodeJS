﻿using System;
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

            if (!isSending && cli == null) return;

            byte[] sendingData = JPEPByteArray(pictureBox1.Image);
            label6.Text = "JPEG Byte : " + sendingData.Length;
            NetworkStream stream = cli.GetStream();
            stream.Write(sendingData, 0, sendingData.Length);
            stream.Close();
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

            if (isSending)
                cli = new TcpClient(IpBox.Text, Int32.Parse(PortBox.Text));
            else { cli.Close(); cli = null; }
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
