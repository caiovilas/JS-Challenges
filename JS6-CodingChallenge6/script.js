// Question 1: Clean the room function: given an input of [1,2,4,591,392,2,10,2,1,20], 
// make a function that organizes these into individual array that is ordered. For 
// example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 
// 391, 392,591]. Bonus: Make it so it organizes strings differently from number 
// types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

let array = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];

let answer = (array) => {
	array.sort()
	let newArray = [];
		for (let i = 0; i < array.length; i++) {
			if (array[i] === array[i+1]){
				if (newArray[(array[i])] === undefined) {
					newArray[(array[i])] = [array[i]];
				}
				newArray[(array[i])].push(array[i]);
			}
			else if (array[i] !== array[i-1]){
				newArray[(array[i])] = array[i];
			}
		}
		newArray = newArray.filter(item => item);
		console.log(newArray);
}
answer(array);




//	//	//	//	//	//	//	//	//	//	//	//	//	//

// Question 2: Write a javascript function that takes an array of numbers and a target
// number. The function should find two different numbers in the array that, when added
// together, give the target number. For example: answer([1,2,3], 4) should return [1,3]

let answer2 = (array, target) => {
	let a;
	let b;
	console.log(`Possible answers:`)
	array.forEach((num1, i) => {
		array.forEach((num2, i) => {
			if ((num1 + num2) === target) {
				console.log(`${num1} + ${num2}`)
				a = num1;
				b = num2;
			}
		})
	})
	return [a, b];
}

answer2([4,2,6,7,35,31,16,14,11,63,34,42,48], 49);

//	//	//	//	//	//	//	//	//	//	//	//	//	//


// Question 3: Write a function that converts HEX to RGB. Then Make that function 
// autodect the formats so that if you enter HEX color format it returns RGB and if 
// you enter RGB color format it returns HEX. Bonus: Release this tool as a npm package.

const hextorgb = (r, g, b) => {
	r = String(r);
	g = String(g);
	b = String(b);
	
	const hextodec = {
		A: 10,
		B: 11,
		C: 12,
		D: 13,
		E: 14,
		F: 15
	};
	
	let hexarray = [
	r.substr(0,1), r.substr(1,1), 
	g.substr(0,1), g.substr(1,1), 
	b.substr(0,1), b.substr(1,1)
	];
	
	hexarray.forEach((item, index, array) => {
		if (isNaN(item) === true) {
			// console.log(`${item} is not a number`)
			array[index] = hextodec[item];
		}
		else {
			// console.log(`${item} is a number`)
			array[index] = Number(item);
		};
	});
	const rn = (hexarray[0]*16) + hexarray[1];
	const gn = (hexarray[2]*16) + hexarray[3];
	const bn = (hexarray[4]*16) + hexarray[5];
	return "RGB(" + rn + ", " + gn + ", " + bn + ")";
};

const rgbtohex = (r, g, b) => {
	let hexarray = [r, g, b];
	const refhex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	const refdec = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
	hexarray.forEach((item, index, array) => {
		let n1;
		let n2;
		n1 = String(Math.floor(item/16));
		n2 = String(Math.floor(item%16));
		n1 = refhex[refdec.indexOf(n1)];
		n2 = refhex[refdec.indexOf(n2)];
		array[index] = n1+n2;
	});
	return `#`+hexarray.join('');
}

const conversor = (a, b, c) => {
	if (isNaN(a) === true || isNaN(b) === true || isNaN(c) === true){
		return hextorgb(a, b, c);
	}
	else {
		return rgbtohex(a, b, c)
	};
}

console.log(conversor("AA","BB","CC"));
console.log(conversor("FF","F1","1F"));
console.log(conversor(1,15,30));
console.log(conversor(64, 128, 255));