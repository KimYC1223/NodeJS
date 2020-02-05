#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <stdlib.h>
#include <WinSock2.h>

void ErrorHandling(const char* message);

int main(int argc, char* argv[]) {
	WSADATA wsaData;
	SOCKET hSocket;
	SOCKADDR_IN servAddr;

	char message[1024];
	int strLen;
	char address[13];
	int port;

	if (argc != 3) {
		printf("Server IP : ");
		scanf("%s", address);
		printf("\n\n");

		printf("Server Port : ");
		scanf("%d", &port);
		printf("\n\n");


		if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) //���� ���̺귯���� �ʱ�ȭ�ϰ� �ִ�
			ErrorHandling("WSAStartup() error!");

		hSocket = socket(PF_INET, SOCK_STREAM, 0); //������ �����ϰ�
		if (hSocket == INVALID_SOCKET)
			ErrorHandling("socket() error");

		memset(&servAddr, 0, sizeof(servAddr));
		servAddr.sin_family = AF_INET;
		servAddr.sin_addr.s_addr = inet_addr(address);
		servAddr.sin_port = htons(port);

		if (connect(hSocket, (SOCKADDR*)&servAddr, sizeof(servAddr)) == SOCKET_ERROR) //������ ������ �������� ������ �����û�� �ϰ� �ִ�
			ErrorHandling("connect() error!");

		while (true) {
			strLen = recv(hSocket, message, sizeof(message) - 1, 0); //recv �Լ� ȣ���� ���ؼ� �����κ��� ���۵Ǵ� �����͸� �����ϰ� �ִ�.
			if (strLen == -1) {
				ErrorHandling("read() error");
				break;
			}
			printf("Message from server:%s\n", message);
		}

		closesocket(hSocket); //���� ���̺귯�� ����
		WSACleanup();
	}
	else {
		if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) //���� ���̺귯���� �ʱ�ȭ�ϰ� �ִ�
			ErrorHandling("WSAStartup() error!");

		hSocket = socket(PF_INET, SOCK_STREAM, 0); //������ �����ϰ�
		if (hSocket == INVALID_SOCKET)
			ErrorHandling("socket() error");

		memset(&servAddr, 0, sizeof(servAddr));
		servAddr.sin_family = AF_INET;
		servAddr.sin_addr.s_addr = inet_addr(argv[1]);
		servAddr.sin_port = htons(atoi(argv[2]));

		if (connect(hSocket, (SOCKADDR*)&servAddr, sizeof(servAddr)) == SOCKET_ERROR) //������ ������ �������� ������ �����û�� �ϰ� �ִ�
			ErrorHandling("connect() error!");


		while (true) {
			strLen = recv(hSocket, message, sizeof(message) - 1, 0); //recv �Լ� ȣ���� ���ؼ� �����κ��� ���۵Ǵ� �����͸� �����ϰ� �ִ�.
			if (strLen == -1) {
				ErrorHandling("read() error");
				break;
			}
			printf("Message from server:%s\n", message);
		}
		
		closesocket(hSocket); //���� ���̺귯�� ����
		WSACleanup();
	}

	return 0;
}



void ErrorHandling(const char* message) {
	fputs(message, stderr);
	fputc('\n', stderr);
	system("PAUSE");
	exit(1);
}