import os
import json

x = open("environments.json")
data = json.load(x)

usrname = data['username']
email = data["email"]

os.system(f"git config --global user.name \"{usrname}\"")
os.system(f"git config --global user.email \"{email}\"")
os.system("git init")
os.system("git add .")
os.system("git remote add origin https://github.com/pengode-handal/anime-website")
pesan = input("Masukin pesan: ")
branch = input("masukin nama branch(kalau belum ada buat dulu): ")
os.system(f"git commit -m \"{pesan}\"")
os.system(f"git branch -M {branch}")
os.system(f"git push -u origin {branch}")