#define _CRT_SECURE_NO_WARNINGS
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#undef UNICODE
#undef _UNICODE

#include <WinSock2.h>
#include <stdio.h>
#include <stdlib.h>
#pragma comment(lib,"ws2_32.lib")
#define BUFSIZE 512

void printfFrame();
void err_Msg(const char *msg, bool option);
void gotoxy(int x, int y);
void textcolor(int color_number);


int main(int argc, char* argv[]) {
	textcolor(31);
	system("mode con cols=38 lines=12");
	char portNum[9] = "00000000";

	printfFrame();
	gotoxy(3, 5);
	printf("포트 번호를 입력하세요.");
	gotoxy(5, 6);
	scanf("%s", portNum);

	char path[200] = "";
	printfFrame();
	gotoxy(3, 5);
	printf("저장할 파일 경로를 입력하세요.");
	gotoxy(3, 6);
	printf("(\"-\"입력시 ./data.txt 로 설정)");
	gotoxy(5, 7);
	scanf("%s", path);

	if (strcmp("-", path) == 0)
		strcpy(path, "data.txt");
	
	int retval;
	WSADATA    wsa;
	if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
		return -1;

	SOCKET sock = socket(AF_INET, SOCK_DGRAM, 0);
	if (sock == INVALID_SOCKET) err_Msg("socket()", TRUE);


	SOCKADDR_IN serveraddr;
	ZeroMemory(&serveraddr, sizeof(serveraddr));
	serveraddr.sin_family = AF_INET;
	serveraddr.sin_port = htons(atoi(portNum));
	serveraddr.sin_addr.s_addr = htonl(INADDR_ANY);

	retval = bind(sock, (SOCKADDR *)&serveraddr, sizeof(serveraddr));
	if (retval == SOCKET_ERROR) err_Msg("connect()", TRUE);

	SOCKADDR_IN clientaddr;
	int addrlen;
	char buf[BUFSIZE + 1];

	printfFrame();
	gotoxy(3, 5);
	printf("연결 대기중 ...");

	while (1) {

		addrlen = sizeof(clientaddr);
		retval = recvfrom(sock, buf, BUFSIZE, 0, (SOCKADDR *)&clientaddr, &addrlen);

		if (retval == SOCKET_ERROR) {
			err_Msg("recvfrom()", FALSE);
			continue;
		}

		buf[retval] = '\0';
		printfFrame();
		gotoxy(3, 5);
		printf("접속 IP : %s", inet_ntoa(clientaddr.sin_addr));
		gotoxy(3, 6);
		printf("포트 : %s", portNum);
		gotoxy(5, 7);
		printf("▶  %s", buf);
		gotoxy(5, 9);
		printf("%s에 저장...", path);


		
		FILE * fp = fopen(path, "w");
		fprintf(fp,"%s",buf);
		fclose(fp);
	}



	// closesock()
	closesocket(sock);

	//윈속종료
	WSACleanup();
	return 0;
}

void gotoxy(int x, int y) {
	COORD Cur;
	Cur.X = x;
	Cur.Y = y;
	SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), Cur);
}

void printfFrame() {
	gotoxy(0,0);
	
	printf("┌───────────────────────────────────┐\n");
	printf("│  UDP 패킷 수신기                  │\n");
	printf("│	      KETI 전자 부품 연구원 │\n");
	printf("├───────────────────────────────────┤\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("│                                   │\n");
	printf("└───────────────────────────────────┘\n");
}

void err_Msg(const char *msg, bool option)
{
	LPVOID lpMsgBuf;

	FormatMessage(
		FORMAT_MESSAGE_ALLOCATE_BUFFER |
		FORMAT_MESSAGE_FROM_SYSTEM,
		NULL, WSAGetLastError(),
		MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
		(LPTSTR)&lpMsgBuf, 0, NULL);

	if (option) {
		MessageBox(NULL, (LPCTSTR)lpMsgBuf, msg, MB_ICONERROR);
		LocalFree(lpMsgBuf);
		exit(-1);
	}
	else {
		printf("[%s] %s", msg, lpMsgBuf);
		LocalFree(lpMsgBuf);
	}
}

void textcolor(int color_number){
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color_number);
}


