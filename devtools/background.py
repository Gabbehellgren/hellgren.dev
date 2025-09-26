import pygame
from pygame.math import Vector2
import random

w = 1000
h = 1000
background = "black"

color = "white"
size = 2.5
vel = 1
decimals = 2
maximal = False

count = 100

class Blob:
    def __init__(self, size, maxvel, color, max = False):
        self.size = size
        self.pos = self.randpos()
        if max:
            self.vel = Vector2(maxvel, 0)
        else:
            self.vel = self.randvel(maxvel)
        self.color = color
        
    def randpos(self):
        x = random.randrange(0, w)
        y = random.randrange(0, h)
        
        return Vector2(x, y)
    
    def randvel(self, maxvel):
        factor = 10**decimals
        maxvel = maxvel*factor
        
        minvel = -1*maxvel
        
        xvel = random.randrange(minvel, maxvel)
        xvel = xvel/factor
        
        yvel = random.randrange(minvel, maxvel)
        yvel = yvel/factor
        
        return Vector2(xvel, yvel)
    
    def move(self):
        self.pos += self.vel
        
    def border(self):
        if self.pos.x > w:
            self.pos.x -= w
        
        elif self.pos.x < 0:
            self.pos.x += w
        
        if self.pos.y > h:
            self.pos.y -= h
        
        elif self.pos.y < 0:
            self.pos.y += h
    
    def draw(self):
        pygame.draw.circle(screen, self.color, self.pos, self.size)
        
    def cycle(self):
        self.move()
        self.border()
        self.draw()
    

# pygame setup
pygame.init()
screen = pygame.display.set_mode((w, h), pygame.RESIZABLE)
clock = pygame.time.Clock()
running = True

blobs = []

while len(blobs) < count:
    blob = Blob(size, vel, color, maximal)
    blobs.append(blob)

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
            
        if event.type == pygame.VIDEORESIZE:
            w, h = event.w, event.h
            screen = pygame.display.set_mode((w, h), pygame.RESIZABLE)

    # fill the screen with a color to wipe away anything from last frame
    screen.fill(background)

    # RENDER YOUR GAME HERE
    
    for blob in blobs:
        blob.cycle()

    # flip() the display to put your work on screen
    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()