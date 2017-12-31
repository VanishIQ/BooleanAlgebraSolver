// initial Author : Ali Hussian
// started : Dec. 28 - 2017
// University of Kerbala , Department of Computer Science
// using the Shunting yard and Reverse Polish notation algorthims
// the idea of a 'stack' was simulated with a JS array
	

	AND = (a,b) => {
	if(isTrueFalse(a))
		a = Number(a);
	if(isTrueFalse(b))
		b = Number(b);
	console.log(a,b);
	let result = a & b;
	if(result == 0){
		if(isVariable(a) && !(isVariable(b))){
			return a;
		}
		else if(isVariable(b) && !(isVariable(a))){
			return b;
		}
		else{
			if(!(isVariable(a) && !(isVariable(b))))
				return 0;
			else
			return a+'&'+b;}
			
	}
	else{return 1;}
	}
	
	OR = (a,b) => {
		
	let result = a | b;
	if(result == 0)
		if(isVariable(a) && !(isVariable(b)))
			return a;
		else if(isVariable(b) && !(isVariable(a)))
			return b
		else
			return a+'&'+b;
	}
	
	NEG = (a,b) => a + b;
		
		
	const Shuntingyard = (exp) => {
		let OUT_QUEUE = [];
		let OPERATOR_STACK = [];
		let e = exp.toLowerCase();
		for (let i = 0; i < exp.length;i++){
			if (exp[i] == ' ')
				continue;
			let token = e[i];
			if (isVariable(token) || isTrueFalse(token))
				OUT_QUEUE.push(token);
			else if(isOperator(token)){
				while(getRank(getTop(OPERATOR_STACK)) >= getRank(token))
					OUT_QUEUE.push(OPERATOR_STACK.pop());
				OPERATOR_STACK.push(token);
			}
			else if(token == "(")
				OPERATOR_STACK.push(token);
			else if(token == ")"){
				while(getTop(OPERATOR_STACK) != "(")
					OUT_QUEUE.push(OPERATOR_STACK.pop());
				OPERATOR_STACK.pop();
			}
		}
		while(OPERATOR_STACK.length != 0)
			OUT_QUEUE.push(OPERATOR_STACK.pop());
		console.log(OUT_QUEUE);
		console.log(RPN(OUT_QUEUE));
	}
		
	const RPN = (exp) =>{
		let EQUATION_STACK = [];
		for (let i = 0; i < exp.length; i++){
			let token = exp[i];
			if (isOperator(token)){
				let op2 = EQUATION_STACK.pop();
				let op1 = EQUATION_STACK.pop();
				let result = eval(op1,op2,token);
				EQUATION_STACK.push(result);
			}
			else if(isVariable(token) || isTrueFalse(token)){
				EQUATION_STACK.push(token);
			}
		}
		return EQUATION_STACK.pop();
	}
		
	const eval = (a,b,operation) =>{
	switch(operation){
		case "&" :return AND(a,b); break;
		case "|" :return OR(a,b);  break;
		case "~" :return NEG(a,b); break;
		
	}

	}	
	const getRank = (token) => {
		switch(token){
			case "~": return 2; break;
			case "&": return 1; break;
			case "|": return 0; break;
		}
	}
	
	const getTop = (stack) => stack[stack.length - 1];
	// const isVariable = (t) => 
	    // (t == "p" || t == "q" || t == "r" ||t == "t" || t == "f");
	const isVariable = (t) => (t >= 'a' && t <= 'z');
	const isTrueFalse= (t) => (t >= '0' && t <= '9');
	const isOperator = (t) => (t == "&" || t == "|" || t == "~");
	
	
	
	
	
	let expression = "1 & 0";
	console.log(Shuntingyard(expression));