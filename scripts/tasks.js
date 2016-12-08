// 1) Написать функцию getFieldValues, которая будет принимать на вход массив объектов, 
// а возвращать будет массив значений одного из полей (отсортированных в порядке возрастания):

var usersData = [
	{ 'user' : 'Alex', 'password' : 'MyNameIsAlex' },
	{ 'user' : 'Bob', 'password' : 'MyNAmeIsBob' }
];
function getFieldValues(mas, name){
	var array = new Array;
	for (var i = 0; i < mas.length; i++) {
		array[i]=mas[i][name];
	}
	for (i = 0; i < array.length; i++) {
		for (var j = i; j < array.length; j++) {
			if (array[i] > array[j]) {
				var s=array[j];
				array[j]=array[i];
				array[i]=s;
			}
		}
	}
	for (var i = 0; i < mas.length; i++) {
		console.log(array[i]);
	}
}
getFieldValues(usersData, 'user'); // --> ['Alex', 'Bob']
console.log("\n");
// 2) Написать функцию, фильтрующую массив с использованием предиката:

var numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55];

function isEven(x) {
	if (x % 2 == 0) {
		return true;
	}else {
		return false;
	}
}

function filter(numbers, isEven) {
	for (var i = 0; i < numbers.length; i++) {
		if (isEven(numbers[i])) {
			console.log(numbers[i]);
		}
	}
}

filter(numbers, isEven); // --> [2, 8, 34]
console.log("\n");

// 3) Даны 2 строки со словами (без знаков препинания), 
// вывести те слова (по одному разу), которые встречаются в обоих строках

var firstLongString = 'Load up on guns and bring your friends it\'s fun to lose and to pretend';
var secondLongString = 'She\'s over bored and self assured oh no I know a dirty word';
function findSimilarWords(str1, str2){
	var str1List = str1.split(' ');
	var str2List = str2.split(' ');
	var result = new Array;
	var k = 0;
	var f = false;
	for (var i = 0; i < str1List.length; i++) {
		for (var j = 0; j < str2List.length; j++) {
			if (str1List[i] == str2List[j]) {
				for (var l = 0; l < k; l++) {
					if (str1List[i] == result[l]) {
						f = true;
						break;
					}
				}
				if (!f) {
					result[k] = str1List[i];
					console.log(result[k]);
					k++;
				}
			}
		}
	}
}
findSimilarWords(firstLongString, secondLongString); // --> ['and'];

console.log("\n");
// 4) Дан IP-адрес (строка) и маска подсети (десятичное число). Написать функцию, которая будет валидировать
// IP-адрес (4 октета, <= 255), а затем выводить сетевой и широковещательный адреса:

var IpAddress = '10.223.98.2';
var subnetMask = 28;
function generateBroadcastAndNetworsAddresses(IpAddress, subnetMask) {
	ip = IpAddress.split('.');
	var str = new Array;
	var ip2 = "";
	for (var i = 0; i < ip.length; i++) {
		str[i] = "";
		while (ip[i] > 0) {
			if (ip[i] % 2 == 0) {
				str[i] = str[i] + '0';
				ip[i] /= 2;
			}else {
				str[i] = str[i] + '1';
				ip[i]--;
				ip[i] /= 2;
			}
		}
		str[i] = str[i].split("").reverse().join("");
		while (str[i].length < 8) {
			str[i] = '0' + str[i];
		}
		ip2 += str[i];
	}
	

	var broadcastMask = 32-subnetMask;

	var mask = "";
	while (mask.length < 32) {
		if (subnetMask > 0) {
			mask += '1';
			subnetMask--;
		}else {
			mask += '0';
		}
	}
	var network = "";
	for (var i = 0; i < 32; i++) {
		if (parseInt(ip2[i]) * parseInt(mask[i]) == 1) {
			network += '1';
		}else {
			network += '0';
		}
	}


	var networkList = new Array;
	var k = 0;
	while (network != "") {
		networkList[k] = network.slice(0,8);
		network = network.replace(networkList[k], "");
		k++;
	}

	var networkListInt = new Array;
	k = 0;
	for(var i = 0; i < networkList.length; i++) {
		networkListInt[k] = 0;
		for (var j = 0; j < networkList[i].length; j++) {
			networkListInt[k] += parseInt(networkList[i][j] * Math.pow(2,7-j));
		}
		k++;
	}
	console.log("Broadcast - " + IpAddress.split(".", 3).join(".") + "." + (Math.pow(2, broadcastMask)-1) + ", Network - " + networkListInt.join("."));

}
generateBroadcastAndNetworsAddresses(IpAddress, subnetMask); // Broadcast - 10.223.98.15, Network - 10.223.98.0

console.log("\n");
// 5) Соединить все массивы в один, не допуская повторения элементов (порядок не важен):
// P. S. 1 == '1' (строковое и числовое представление number'ов считать идентичными)

var totalMessArray = [['a', 1, true], [true, 99, 'aa', undefined], ['1']];

function makeItClean(array) {
	var array2 = new Array;
	var f;
	var x = 0;
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			f = false;
			if (array[i][j] == undefined) {
				array[i][j] = "undefined";
			}
			for (var k = 0; k < x; k++) {
				if (array2[k].toString() == array[i][j].toString()) {
					f = true;
					break;
				}
			}
			if (!f) {
				x++;
				array2[x-1] = array[i][j];
			}
		}
	}


	for (var i = 0; i < array2.length; i++) {
		console.log(array2[i]);
	}
}

makeItClean(totalMessArray); // --> ['a', 'aa', 1, undefined, true];