	var result         = document.getElementById('result');
	var generate       = document.getElementById('btngenerate');
	var sbnumofwords   = document.getElementById('numofwords');
	var sbseparator    = document.getElementById('separator');
	var sbnumofnumbers = document.getElementById('numofnumbers');


	var dict  = "";

	//besides firefox other Browsers cant't read file by xhr.
	var words =["hello","world","you","are","handsome","Americanisms","Muslim","Octobers","Sabbaths","Wednesday","abhor","able","aborted","abrupt"];
	var text,count,separator,numOfWords,numOfNumbers;

	function randomWords(words_count,num_count,separator,num_numbers){
		
		num_count   = num_count || 0;
		separator   = separator || "-";
		num_numbers = num_numbers || 0;


		var count = [];
		for (var i = 0; i < num_count; i++) {
			count[i] = parseInt(Math.random()*words_count);
			text += words[count[i]]+separator;
		};
		text=text.slice(0,text.length-1);
		var now = new Date();
		if(num_numbers == 1){
			var position = now.getSeconds()%(text.length);
			text = text.slice(0,position)+(now.getSeconds() % 10)+text.slice(position);
			return text;
		}
		return text;
	}

	//update view
	function updateNode(node,text){
		if(text.length > 40){
			text = text.slice(0,38);
		}
		if(text[text.length-1] == separator){
			text=text.slice(0,text.length-1);
		}
		node.innerHTML = text;
	}

	//get setting option information
	function updateSet(){
		text = "";
		var selIndexw = sbnumofwords.selectedIndex;
		numOfWords = sbnumofwords.options[selIndexw].value;
		var selIndexn = sbnumofnumbers.selectedIndex;
		numOfNumbers = sbnumofnumbers.options[selIndexn].value;
		var selIndexs = sbseparator.selectedIndex;
		separator = sbseparator.options[selIndexs].value;
	}

	//make this default
	sbnumofwords.selectedIndex = 2;
	sbnumofnumbers.selectedIndex = 0;
	sbseparator.selectedIndex = 0;

	updateSet();
	var xhr = new XMLHttpRequest();

	//XMLRequest event readystatechange
	xhr.onreadystatechange = function(event){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status<300) ||xhr.status == 304){
				dict  = xhr.responseText;
				words = dict.split(/\n/);

				text = randomWords(words.length,numOfWords,separator,numOfNumbers);
				updateNode(result,text);
			}else{
				console.log("error"+xhr.status);
			}
		}
	}
	try{
		xhr.open("get","dict.txt",true);
		xhr.send(null);
		console.log("error");
	}catch(ex){
		var droptarget = document.getElementById('result');

		var html = "<strong>Please drop dict.txt here!</strong>"
		updateNode(droptarget,html);
		
		EventUtil.addHandler(droptarget, "dragenter", handleEvent);
        EventUtil.addHandler(droptarget, "dragover", handleEvent);
        EventUtil.addHandler(droptarget, "drop", handleEvent);

	}

	function handleEvent(event){
        var info = "",
            files, i, len;
        var reader = new FileReader();

        EventUtil.preventDefault(event);

        if (event.type == "drop"){
            files = event.dataTransfer.files;
            i = 0;
            len = files.length;

            if(/dict/.test(files[0].name)){
            	reader.readAsText(files[0]);
            }
            reader.onload = function(){
            	dict = reader.result;
            	words = dict.split(/\n/);

				text = randomWords(words.length,numOfWords,separator,numOfNumbers);
				updateNode(result,text);
            }
        }
    }

	//click event for generator button
	EventUtil.addHandler(generate,"click",function(){
		updateSet();
		text = randomWords(words.length,Number(numOfWords),separator,numOfNumbers);
		updateNode(result,text);
	});





	$(document).ready(function(){
		$("#set").click(function(){
			$("fieldset").slideToggle("slow");
		})
	})