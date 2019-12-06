#define _CRT_SECURE_NO_WARNINGS
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>
#include <Windows.h>
#include <Time.h>
#pragma comment(lib, "ws2_32.lib")

#define BUF_SIZE 512
void ErrorHandling(char* message);
void gotoxy(int x, int y);
void makeRand(char * string);
void printFrame();
int control = 0;
void textcolor(int color_number);

int main()
{
	system("mode con cols=41 lines=12");
	char portNum[9] = "00000000";
	printFrame();
	gotoxy(3, 5);
	printf("포트 번호를 입력하세요.");
	gotoxy(5, 6);
	scanf("%s", portNum);
	srand(time(NULL));

	WSADATA wsaData;
	SOCKET sock;
	char buf[BUF_SIZE];
	FILE* fp;
	SOCKADDR_IN servAdr;

	char argv[4][40] = { "","127.0.0.1","9050","test.txt" };


	if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
		char msg[30] = "WSAStartup() error!";
		ErrorHandling(msg);
	}

	sock = socket(PF_INET, SOCK_DGRAM, 0);
	if (sock == INVALID_SOCKET) {
		char msg[30] = "socket() error";
		ErrorHandling(msg);
	}

	memset(&servAdr, 0, sizeof(servAdr));
	servAdr.sin_family = AF_INET;
	servAdr.sin_addr.s_addr = inet_addr(argv[1]);
	servAdr.sin_port = htons(atoi(portNum));
	char output[8][10] = { "","","","","","","","" };

	gotoxy(0, 0);
	printFrame();
	gotoxy(2, 5);
	printf("▶ ");

	while (true) {
		for (int i = 0; i < 7; i++)
			strcpy(output[7 - i], output[6 - i]);
		makeRand(output[0]);

		for (int i = 0; i < 8; i++) {
			if (i == 0) textcolor(10);
			else if (i == 1)textcolor(14);
			gotoxy(7 + 12 * (i / 4), 5 + (i % 4));
			printf("%s", output[i]);
			if (i <= 1) textcolor(15);
		}
		connect(sock, (SOCKADDR*)& servAdr, sizeof(servAdr));

		int stringLength = strlen(output[0]);
		sendto(sock, (char*)& output[0], stringLength, 0, (SOCKADDR*)& servAdr, sizeof(servAdr));
		gotoxy(0, 11);
		textcolor(14);
		Sleep(200); gotoxy(22, 1); printf("▶    "); gotoxy(0, 11);
		Sleep(200);	gotoxy(22, 1); printf("  ▶  ");	gotoxy(0, 11);
		Sleep(200);	gotoxy(22, 1); printf("    ▶"); gotoxy(0, 11);
		Sleep(200);	gotoxy(22, 1); printf("      "); gotoxy(0, 11);
		textcolor(15);
		Sleep(200);
	}
	shutdown(sock, SD_SEND);
	closesocket(sock);
	WSACleanup();
	return 0;
}

void makeRand(char * string) {
	for (int j = 0; j < 9; j++)
		string[j] = '0' + (rand() % 10);
	string[9] = '\0';
}

void ErrorHandling(char* message) {
	system("CLS");
	printFrame();
	gotoxy(3, 5);
	printf("에러 발생");
	gotoxy(3, 7);
	printf("%s", message);
	exit(1);
}

void gotoxy(int x, int y) {
	COORD Cur;
	Cur.X = x;
	Cur.Y = y;
	SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), Cur);
}

void printFrame() {
	printf("┌───────────────────────────────────┐\n");
	printf("│  UDP 패킷 생성기                  │\n");
	printf("│  난수 범위 : 9자리 자연수         │\n");
	printf("├───────────────────────────────────┤\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("└───────────────────────────────────┘\n");
}

void textcolor(int color_number) {
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color_number);
}
