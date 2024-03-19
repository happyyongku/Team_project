
import pygame
import sys
import random

pygame.init() # pygame 모듈 초기화

img_neko = [
    None,
    pygame.image.load("neko1.png"),
    pygame.image.load("neko2.png"),
    pygame.image.load("neko3.png"),
    pygame.image.load("neko4.png"),
    pygame.image.load("neko5.png"),
    pygame.image.load("neko6.png"),
    pygame.image.load("neko_niku.png"),
]

neko = [[] for _ in range(10)]
check = [[0]*8 for _ in range(10)]

turn = 0
map_y = 10
map_x = 8
display_width = 912
display_height = 768
bg =  pygame.image.load("neko_bg")
cursor = pygame.image.load("neko_cursor")

for y in range(map_y):
    for x in range(map_x):
        neko[y].append(random.choice(range(1, 7)))


gameDisplay = pygame.display.set_mode((display_width, display_height)) #스크린 초기화
pygame.display.set_caption("애니팡")  # 타이틀
clock = pygame.time.Clock() #Clock 오브젝트 초기화

class Mouse :
    def __init__(self, cursor, map_y, map_x):
        self.turn = 0
        self.cursor = cursor
        self.map_y = map_y
        self.map_x = map_x
        
    def get_mouse(self):
        position = pygame.mouse.get_pos()  # (x, y)
        click = pygame.mouse.get_pressed()  # [0, 1, 2]
        for y in range(map_y):
            for x in range(map_x):
                if x*72+20 < position[0] < (x+1)*72+20 and y*72+20 < position[1] < (y+1)*72+20:
                    if self.turn == 0:
                        gameDisplay.blit(self.cursor, (x*72+20, y*72+20))
                        if click[0] :
                            self.turn = 0
                            check[y][x] = 1
                    else:
                        if (0 <= y-1 and check[y-1][x] == 1) or (y+1 < self.map_y and check[y+1][x] == 1) or (0 <= x-1 and check[y][x-1] == 1) or (x+1 < self.map_x and check[y][x+1] == 1) :
                            gameDisplay.blit(self.cursor, (x*72+20, y*72+20))
                            if click[0] :
                                self.turn = 0
                                switch_neko()
                            elif click[2] :
                                pass  # 오른쪽 클릭 시 초기화, 잠겨 있는 이미지 변환
                                

def switch_neko():
    # 두 고양이 위치를 서로 바꾸는 함수
    pass

def check_neko():
    # 상하좌우 같은 고양이가 3개 이상되는지
    # 만약 되었다면 7로 바꿔주기
    pass

def cursor_set():
    # 커서 초기화 시키기
    pass

def cursor_draw():
    for y in range(map_y):
        for x in range(map_x):
            if check[y][x] == 1:
                gameDisplay.blit(cursor, x*72+20, y*72+20)

def neko_draw():
    for y in range(map_y):
        for x in range(map_x):
            gameDisplay.blit(img_neko[neko[y][x]], (x*72+20, y*72+20))

def game(): # 메인 게임 함수
    
    tmr = 0 # 시간 관리 변수
    # 마우스 클래스 부르기
    # 게임 함수
    m = Mouse(cursor, map_y, map_x)
    
    while True:
        tmr += 1 # 매 시간 1초 증가
        for event in pygame.event.get(): # 윈도운 X 누를 시 나오게끔
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
        
        gameDisplay.blit(bg, (0, 0))
        neko_draw()
        m.get_mouse()
        cursor_draw()
        check_neko()
        pygame.display.update()
        clock.tick(20)
        
game()