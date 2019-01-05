from flask import Flask,render_template,request,json,redirect,url_for
import re
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('hello.html')


@app.route("/", methods=['POST'])
def redirectUser():
    return redirect(url_for("signUp"))


@app.route('/signUp')
def signUp():
    return render_template('signup.html')

def checkpassword(word):
	p = {};
	p.update({'1': 'Match'}) if re.match(r"(\w{8,})", word) else p.update({'1': 'Should be at least 8 characters in length'})
	p.update({'2': 'Match'}) if re.match(r"(?=.*\d)", word) else p.update({'2': 'Should have at least 1 number'})
	p.update({'3': 'Match'}) if re.match(r"(?=.*[A-Z])", word) else p.update({'3': 'Should have at least 1 uppercase character'})
	return p

x = []
def get_array(mat_dict):
	for key,value in mat_dict.items():
		if value == 'Not Match':
			x.append(int(key))
	return x
	
@app.route('/signUpUser', methods=['POST'])
def signUpUser():
	k = []
	user = request.form['username'];
	password = request.form['password'];
	y = checkpassword(password)
	k = {}
	if all(value == 'Match' for value in y.values()): 
		return json.dumps({'status':'OK','user': user, 'pass': password});
	else:
		k = { int(k):v for k,v in y.items() if v != 'Match' }
		key_list = list(k.keys())
		return json.dumps({'status':'BAD','user': user, 'pass': key_list});   	

if __name__ == "__main__":
    app.run(debug=True)