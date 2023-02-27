import json
import os
import time
from pickle import NONE
from werkzeug.utils import secure_filename
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.preprocessing import image
from flask import Flask, render_template, session, request, flash, redirect
import flask

# from flask_ngrok import run_with_ngrok

import sys
import os
from flask import Flask, request
# from flask_restful import Resource, Api

app = Flask(__name__)
# run_with_ngrok(app)
# api = Api(app)
# port = 5100

# if sys.argv.__len__() > 1:
#     port = sys.argv[1]
# print("Api running on port : {} ".format(port))


# api.add_resource(topic_tags, '/')


# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=port)


with open("config.json", "r") as c:
    params = json.load(c)["params"]
import numpy as np

app = Flask(__name__, template_folder="template", static_folder="static")
app.secret_key = "super-secret-key"
# app.secret_key = 'super-secret-key'
# app.config['UPLOAD_FOLDER'] = params['upload_location']

Model = load_model(r"models\model.h5")


def model_predict(img_path, model):
    img = image.load_img(img_path, target_size=(150, 150))
    img = image.img_to_array(img)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    preds = model.predict(img)

    if preds[0][0] > 0.5:
        return "Pneumonia", preds[0][0]

    else:
        return "Normal", preds[0][0]


# @app.route("/", methods=["GET", "POST"])
# def login():
#     if "user" in session and session["user"] == params["admin_user"]:
#         return render_template("form.html", params=params)

#     if request.method == "POST":
#         username = request.form.get("uname")
#         userpass = request.form.get("pass")
#         if username == params["admin_user"] and userpass == params["admin_password"]:
#             # set the session variable
#             session["user"] = username
#             return render_template("form.html", params=params)
#     return render_template("login.html", params=params)


# @app.route("/", methods=["GET", "POST"])
# def login():
#     # output = request.get_json()
#     output = None
#     # print(output)
#     if (output == None):
#         print('None')
#         # test()
#         # return redirect("login.html", code=302)
#         return render_template("login.html")
#     # elif(output != None):
#     #     result = json.loads(output)
#     #     print(result['name'])
#     #     name_of_user = result['name']
#     #     return render_template("form.html")
#     # else:
#     #     print('else')
#     #     return render_template("login.html")

@app.route("/", methods=["GET", "POST"])

def login():
    return render_template("login.html")

# def login():
#     output = request.get_json()
#     if(output == None):
#         output = '{"name":"something"}'
#     result = json.loads(output)
#     print(result)
#     # if a > b or a > c:
#     if result['name'] == 'Noname' or result['name'] == 'something':
#         return redirect("testing")
#     else:
#         print('ok')
#         time.sleep(5) 
#         return render_template("form.html")

@app.route("/passing", methods=["GET", "POST"])
def passing():
    return render_template("form.html")

@app.route("/forgot", methods=["GET", "POST"])
def forgot():
    return render_template("forgot.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    return render_template("register.html")


def test():
    # print(params)
    return render_template('form.html')

@app.route("/uploader", methods=["GET", "POST"])
def uploader():
    if request.method == "POST":
        pname = request.form.get("pname")
        print(pname)
        age = request.form.get("age")
        print(age)
        confusion = request.form.get("confusion")
        print(confusion)
        rr = request.form.get("rr")
        print(rr)
        bp = request.form.get("bp")
        print(bp)
        uremia = request.form.get("uremia")
        print(uremia)
        f = request.files["file1"]
        basepath = os.path.dirname(__file__)
        filepath = os.path.join(basepath, "uploaded_files", secure_filename(f.filename))
        f.save(filepath)
        predict, percent = model_predict(filepath, Model)

        aflag=0
        cflag=0
        bpflag=0
        rrflag=0
        uflag=0
        if int(age) > 65:
            aflag=1
        else:
            aflag=0

        if confusion == "no":
            cflag = 0
        else:
            cflag = 1

        if int(bp) <= 90:
            bpflag = 1
        else:
            bpflag = 0

        if int(rr) >= 30:
            rrflag = 1
        else:
            rrflag = 0

        if int(uremia) > 7:
            uflag = 1
        else:
            uflag = 0

        sscore = aflag+cflag+bpflag+rrflag+uflag
        print('aflag->', aflag)
        print('cflag->', cflag)
        print('bpflag->', bpflag)
        print('rrflag->', rrflag)
        print('uflag->', uflag)


        print('score->', sscore)
        if sscore==0:
            mortality = 0.7
            mgmt = "Treat as outpatient"
        elif sscore == 1:
            mortality = 2.1
            mgmt = "Treat as outpatient"
        elif sscore == 2:
            mortality = 9.2
            mgmt = "Admit to wards"
        elif sscore == 3:
            mortality = 14.5
            mgmt = "Admit to ICU"
        elif sscore == 4:
            mortality = 40
            mgmt = "Admit to ICU"
        elif sscore == 5:
            mortality = 57
            mgmt = "Admit to ICU"
        print(mortality)
        print(percent)
        print(predict)
        print(mgmt)
        # print(predict, percent, mortality, mgmt)
        if(predict == 'Pneumonia'):
            return render_template(
                "prediction.html", prediction_text="We have predicted : {}, Mortality is ={} Percent and Management is ={}".format(predict, mortality, mgmt)
            )
        else:
             return render_template(
            "prediction.html", prediction_text="We have predicted : {}".format(predict)
        )

@app.route("/login", methods=["GET", "POST"])
def logout():
    session.clear()
    session.pop('user')
    return render_template("login.html",params = "params")

if __name__ == '__main__':
    app.run()
