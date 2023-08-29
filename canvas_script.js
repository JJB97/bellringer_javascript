var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var screenObject;
var bellSound = new Sound();

function MainPage() {
    this.requestedData = decodeURIComponent(escape(atob(value))).split('\n');
    this.email = this.requestedData[0];
    this.requestDate = this.requestedData[1];
    this.numOfProblemPerPage = Number(this.requestedData[2]);
    this.totalPages = Number(this.requestedData[3]);
    this.totalNumberOfProblems = this.numOfProblemPerPage * this.totalPages;
    this.period = Number(this.requestedData[4]);
    this.chapters = this.requestedData[5];
    this.bellImageURI = "data:image/png;base64,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";
    this.btnArea = {};

    this.update = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.btnArea.bell = {startX:canvas.width*0.48, startY:canvas.height*0.91, width:canvas.width*0.04, height:canvas.height*0.07};
        this.btnArea.startbtn = {startX:canvas.width*0.25, startY:canvas.height*0.915, width:canvas.width*0.1, height:canvas.height*0.07};
        this.btnArea.answerbtn = {startX:canvas.width*0.65, startY:canvas.height*0.915, width:canvas.width*0.1, height:canvas.height*0.07};

        ctx.font = "bold " + canvas.height*0.1 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("땡시 연습기", canvas.width*0.5, canvas.height*0.1, canvas.width*0.7);

        ctx.font = canvas.height*0.04 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("요청자: "+this.email+" / 요청시간: "+this.requestDate, canvas.width*0.5, canvas.height*0.2, canvas.width*0.9);

        ctx.font = canvas.height*0.04 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        const problemSetTxt = "페이지당 문제 수: "+this.numOfProblemPerPage+" / 총 페이지 수: "+this.totalPages+" / 총 문제 수: "+this.totalNumberOfProblems+" / 시간: "+this.period/1000+"초";
        ctx.fillText(problemSetTxt, canvas.width*0.5, canvas.height*0.3, canvas.width*0.9);

        ctx.font = canvas.height*0.03 + "px 돋움체";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "gray";
        let words = this.chapters.split(', ');
        let line = '';
        let lineHeight = 0;
        for(let i=0; i<words.length; i++) {
            let testLine = line + words[i];
            if (ctx.measureText(testLine).width>canvas.width*0.9 && i>0) {
                ctx.fillText(line, canvas.width*0.5, canvas.height*0.4+lineHeight);
                line = words[i];
                if (i < words.length-1){
                    line += ', ';
                }
                lineHeight += canvas.height*0.04;
            } else {
                line = testLine;
                if (i < words.length-1){
                    line += ', ';
                }
            }
        }
        ctx.fillText(line, canvas.width*0.5, canvas.height*0.4+lineHeight);


        ctx.clearRect(0, canvas.height*0.9, canvas.width, canvas.height);

        ctx.fillStyle = "blue";
        ctx.fillRect(this.btnArea.answerbtn.startX, this.btnArea.answerbtn.startY, this.btnArea.answerbtn.width, this.btnArea.answerbtn.height);
        ctx.font = canvas.height*0.04 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("Answer", this.btnArea.answerbtn.startX+this.btnArea.answerbtn.width/2, this.btnArea.answerbtn.startY+this.btnArea.answerbtn.height/2, this.btnArea.answerbtn.width*0.9);

        ctx.fillStyle = "red";
        ctx.fillRect(this.btnArea.startbtn.startX, this.btnArea.startbtn.startY, this.btnArea.startbtn.width, this.btnArea.startbtn.height);
        ctx.font = canvas.height*0.04 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("Start", this.btnArea.startbtn.startX+this.btnArea.startbtn.width/2, this.btnArea.startbtn.startY+this.btnArea.startbtn.height/2, this.btnArea.startbtn.width*0.9);
        
        let bellImageObj = new Image();
        let self = this;
        bellImageObj.onload = function(){
            ctx.drawImage(bellImageObj, self.btnArea.bell.startX, self.btnArea.bell.startY, self.btnArea.bell.width, self.btnArea.bell.height);
            self = null;
        }
        bellImageObj.src = this.bellImageURI;
    }

    this.showAnswer = function() {
        this.clearLI();
        screenObject = null;
        screenObject = new AnswerPageManager(problemList);
    }

    this.startExam = function() {
        bellSound.play();
        this.clearLI();
        screenObject = null;
        screenObject = new ProblemManager(problemList, this.numOfProblemPerPage, this.period);
    }

    this.onPointerUp = function(event){
        const isStartBtn = this.btnArea.startbtn.startX<event.pageX && event.pageX<this.btnArea.startbtn.startX+this.btnArea.startbtn.width && this.btnArea.startbtn.startY<event.pageY && event.pageY<this.btnArea.startbtn.startY+this.btnArea.startbtn.height;
        const isAnswerBtn = this.btnArea.answerbtn.startX<event.pageX && event.pageX<this.btnArea.answerbtn.startX+this.btnArea.answerbtn.width && this.btnArea.answerbtn.startY<event.pageY && event.pageY<this.btnArea.answerbtn.startY+this.btnArea.answerbtn.height;
        const isBellBtn = this.btnArea.bell.startX<event.pageX && event.pageX<this.btnArea.bell.startX+this.btnArea.bell.width && this.btnArea.bell.startY<event.pageY && event.pageY<this.btnArea.bell.startY+this.btnArea.bell.height;
        if(event.isPrimary && isStartBtn){
            this.startExam();
        } else if(event.isPrimary && isAnswerBtn){
            this.showAnswer();
        } else if(event.isPrimary && isBellBtn){
            this.bellSoundPlay();
        }
    }

    this.bellSoundPlay = function(){
        bellSound.play();
    }

    this.clearLI = function() {
        window.removeEventListener('pointerup', this.pointerUpEventFunction);
        window.removeEventListener('pointercancel', this.pointerUpEventFunction);
        window.removeEventListener('resize', this.resizeEventFunction);
    }

    this.pointerUpEventFunction = this.onPointerUp.bind(this);
    this.resizeEventFunction = this.update.bind(this);
    window.addEventListener('pointerup', this.pointerUpEventFunction);
    window.addEventListener('pointercancel', this.pointerUpEventFunction);
    window.addEventListener('resize', this.resizeEventFunction);
    this.update();
}

function ProblemManager(pl, npp, t) {
    this.problemList = pl;
    this.totalNumberOfProblems = this.problemList.length;
    this.numberOfProblemsPerPages = npp;
    this.period = t;
    this.currentProblemNumber = 1;
    this.currentProblems = this.problemList.slice(this.currentProblemNumber-1, this.numberOfProblemsPerPages+this.currentProblemNumber-1);
    this.problemArea = {startX:[], startY:[], endX:[], endY:[]};
    this.btnPos = {};
    this.duobleLineThreshold = 3;
    this.isExpanded = false;

    this.update = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.btnPos = {startX:canvas.width*0.65, startY:canvas.height*0.915, endX:canvas.width*0.75, endY:canvas.height*0.985};
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.problemArea.startX = [];
        this.problemArea.startY = [];
        this.problemArea.endX = [];
        this.problemArea.endY = [];
        
        if (this.currentProblems.length<this.duobleLineThreshold) { //한줄 jinja 
            for (let i=0; i<this.currentProblems.length; i++) {
                this.problemArea.startX[i] = canvas.width/this.currentProblems.length*i;
                this.problemArea.startY[i] = canvas.height*0.1;
                this.problemArea.endX[i] = canvas.width/this.currentProblems.length*(i+1);
                this.problemArea.endY[i] = canvas.height*0.9;
            }
        } else { //두줄 jinja
            for (let i=0; i<Math.ceil(this.currentProblems.length/2); i++) { //윗줄
                this.problemArea.startX[i] = canvas.width/Math.ceil(this.currentProblems.length/2)*i;
                this.problemArea.startY[i] = canvas.height*0.05;
                this.problemArea.endX[i] = canvas.width/Math.ceil(this.currentProblems.length/2)*(i+1);
                this.problemArea.endY[i] = canvas.height*0.45;
            }
            for (let i=0; i<Math.floor(this.currentProblems.length/2); i++) { //아랫줄
                this.problemArea.startX[Math.ceil(this.currentProblems.length/2)+i] = canvas.width/Math.floor(this.currentProblems.length/2)*i;
                this.problemArea.startY[Math.ceil(this.currentProblems.length/2)+i] = canvas.height*0.5;
                this.problemArea.endX[Math.ceil(this.currentProblems.length/2)+i] = canvas.width/Math.floor(this.currentProblems.length/2)*(i+1);
                this.problemArea.endY[Math.ceil(this.currentProblems.length/2)+i] = canvas.height*0.9;
            }
        }
        this.fillImages(this.currentProblems);
        this.drawLine(this.currentProblems.length);
        this.writeNumbers(this.currentProblems.length);
        this.drawController();
    }

    this.drawLine = function(numOfProblems) {
        if(!this.isExpanded){
            if (numOfProblems<this.duobleLineThreshold) {//한줄 jinja
                for (let i of [0.1, 0.9]) {
                    ctx.beginPath(); //바닥줄
                    ctx.moveTo(0, canvas.height*i);
                    ctx.lineTo(canvas.width, canvas.height*i);
                    ctx.stroke();
                }
                for (let i=0; i<numOfProblems-1; i++) {
                    ctx.beginPath();
                    ctx.moveTo(canvas.width*(i+1)/numOfProblems, 0);
                    ctx.lineTo(canvas.width*(i+1)/numOfProblems, canvas.height*0.9);
                    ctx.stroke();
                }
            } else {//두줄 jinja
                for (let i of [0.05, 0.45, 0.5, 0.9]) {
                    ctx.beginPath();
                    ctx.moveTo(0, canvas.height*i);
                    ctx.lineTo(canvas.width, canvas.height*i);
                    ctx.stroke();
                }
                for (let i=0; i<Math.ceil(numOfProblems/2)-1; i++) { // 윗줄
                    ctx.beginPath();
                    ctx.moveTo(canvas.width*(i+1)/Math.ceil(numOfProblems/2), 0);
                    ctx.lineTo(canvas.width*(i+1)/Math.ceil(numOfProblems/2), canvas.height*0.45);
                    ctx.stroke();
                }
                for (let i=0; i<Math.floor(numOfProblems/2)-1; i++) { // 아랫줄
                    ctx.beginPath();
                    ctx.moveTo(canvas.width*(i+1)/Math.floor(numOfProblems/2), canvas.height*0.45);
                    ctx.lineTo(canvas.width*(i+1)/Math.floor(numOfProblems/2), canvas.height*0.9);
                    ctx.stroke();
                }
            }
        }
        
    }

    this.fillImages = function(imgList) {
        let self = this;
        let images = [];                  
        for(let i=0; i<imgList.length; i++){
            images.push(new Image());
            images[i].onload = function (event) {
                if(!self.isExpanded) {
                    const ratio = images[i].height/images[i].width;
                    const problemAreaWidth = self.problemArea.endX[i]-self.problemArea.startX[i];
                    const problemAreaHeight = self.problemArea.endY[i]-self.problemArea.startY[i];
                    if(problemAreaWidth*ratio > problemAreaHeight){
                        const imageWidth = problemAreaHeight/ratio;
                        const imageHeight = problemAreaHeight;
                        const imageWidthStart = self.problemArea.startX[i]+problemAreaWidth/2-(problemAreaHeight/ratio)/2;
                        const imageHeightStart = self.problemArea.startY[i];
                        ctx.drawImage(images[i], imageWidthStart, imageHeightStart, imageWidth, imageHeight);
                    } else {
                        const imageWidth = problemAreaWidth;
                        const imageHeight = problemAreaWidth*ratio;
                        const imageWidthStart = self.problemArea.startX[i];
                        const imageHeightStart = self.problemArea.startY[i]+problemAreaHeight/2-problemAreaWidth*ratio/2;
                        ctx.drawImage(images[i], imageWidthStart, imageHeightStart, imageWidth, imageHeight);
                    }
                }
            }
            images[i].src = imgList[i].problem;
        }
    }

    this.expandImage = function(event) {
        for(let i=0; i<this.currentProblems.length; i++){                  
            const isProblem = this.problemArea.startX[i]<event.clientX && event.clientX<this.problemArea.endX[i] && this.problemArea.startY[i]<event.clientY && event.clientY<this.problemArea.endY[i];
            if (event.isPrimary && isProblem) {
                let selectedImage = new Image();
                let self = this;
                selectedImage.onload = function(event) {
                    if(self.isExpanded) {
                        const ratio = selectedImage.height/selectedImage.width;
                        const problemWidth = self.problemArea.endX[self.problemArea.endX.length-1]-self.problemArea.startX[0];
                        const problemHeight = self.problemArea.endY[self.problemArea.endY.length-1]-self.problemArea.startY[0];

                        ctx.clearRect(0, 0, self.problemArea.endX[self.problemArea.endX.length-1], self.problemArea.endY[self.problemArea.endY.length-1]);
                        
                        ctx.beginPath();
                        ctx.moveTo(0, self.problemArea.startY[0]);
                        ctx.lineTo(canvas.width, self.problemArea.startY[0]);
                        ctx.stroke();
                        
                        ctx.font = self.problemArea.startY[0] * 0.8 + "px Arial";
                        ctx.textBaseline = "middle";
                        ctx.textAlign = "center";
                        ctx.fillStyle = "red";
                        ctx.fillText(self.currentProblems[i].number, canvas.width/2, self.problemArea.startY[0]/2, canvas.width);

                        if (problemWidth*ratio > problemHeight) {
                            ctx.drawImage(selectedImage, problemWidth/2-(problemHeight/ratio)/2, self.problemArea.startY[0], problemHeight/ratio, problemHeight);
                        } else {
                            ctx.drawImage(selectedImage, self.problemArea.startX[0], problemHeight/2+self.problemArea.startY[0]-problemWidth*ratio/2, problemWidth, problemWidth*ratio);
                        }
                    }
                }
                selectedImage.src = this.currentProblems[i].problem;
                this.isExpanded = true;
                return;
            }
        }
        return;
    }

    this.onPointerUp = function(event) {
        this.isExpanded = false;
        const isButton = this.btnPos.startX<event.pageX && event.pageX<this.btnPos.endX && this.btnPos.startY<event.pageY && event.pageY<this.btnPos.endY;
        if(event.isPrimary && isButton){
            this.clearLI();
            screenObject = null;
            screenObject = new MainPage();
        } else if(event.isPrimary) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.update();
        }
    }
    
    this.writeNumbers = function(numOfProblems) {
        if(!this.isExpanded){
            ctx.font = this.problemArea.startY[0]*0.8 + "px Arial";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            for(let i=0; i<numOfProblems; i++){
                const num = this.currentProblems[i].number;
                const x = this.problemArea.startX[i] + (this.problemArea.endX[i]-this.problemArea.startX[i])/2;
                const y = this.problemArea.startY[i] - this.problemArea.startY[0]/2;
                const maxWidth = this.problemArea.endX[i] - this.problemArea.startX[i];
                ctx.fillText(num, x, y, maxWidth);
            }
        }
    }
    
    this.nextPage = function() {
        this.isExpanded = false;
        bellSound.play();
        if (this.currentProblemNumber+this.numberOfProblemsPerPages <= this.totalNumberOfProblems) {
            this.currentProblemNumber += this.numberOfProblemsPerPages;
            this.currentProblems = this.problemList.slice(this.currentProblemNumber-1, this.numberOfProblemsPerPages+this.currentProblemNumber-1);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.update();
        } else {
            this.clearLI();
            screenObject = null;
            screenObject = new AnswerPageManager(problemList);
        }
    }

    this.drawController = function() {
        const pagetxt = "Page : " + Math.floor(this.currentProblemNumber/this.numberOfProblemsPerPages+1) + "/" + Math.ceil(this.totalNumberOfProblems/this.numberOfProblemsPerPages);
        ctx.font = canvas.height*0.06 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText(pagetxt, canvas.width*0.33, canvas.height*0.95, canvas.width*0.2);

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.btnPos.startX, this.btnPos.startY, this.btnPos.endX-this.btnPos.startX, this.btnPos.endY-this.btnPos.startY);

        ctx.font = canvas.height*0.04 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("HOME", canvas.width*0.7, canvas.height*0.95, canvas.width*0.09);
    }

    this.clearLI = function() {
        canvas.removeEventListener('pointerdown', this.pointerDownEventFunction);
        window.removeEventListener('pointerup', this.pointerUpEventFunction);
        window.removeEventListener('pointercancel', this.pointerUpEventFunction);
        window.removeEventListener('resize', this.resizeEventFunction);
        clearInterval(this.interval);
    }

    this.pointerDownEventFunction = this.expandImage.bind(this);
    this.pointerUpEventFunction = this.onPointerUp.bind(this);
    this.resizeEventFunction = this.update.bind(this);
    this.intervalFunction = this.nextPage.bind(this);
    canvas.addEventListener('pointerdown', this.pointerDownEventFunction);
    window.addEventListener('pointerup', this.pointerUpEventFunction);
    window.addEventListener('pointercancel', this.pointerUpEventFunction);
    window.addEventListener('resize', this.resizeEventFunction);

    this.update();
    this.interval = setInterval(this.intervalFunction, this.period);
}

function AnswerPageManager(pl) {
    let problemList = Array.from(pl);
    this.problemList = problemList.sort(function(a, b){
        return a.number - b.number;
    });
    this.btnPos = {};
    this.btnPos.home = {};
    this.btnPos.triangle = {};
    this.currentPage = 1;
    this.isExpanded = false;

    this.update = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        
        this.btnPos.home = {startX:canvas.width*0.6, startY:canvas.height*0.915, endX:canvas.width*0.7, endY:canvas.height*0.985};
        this.btnPos.triangle = {leftX:canvas.width*0.2, leftY:canvas.height*0.95, rightX:canvas.width*0.4, rightY:canvas.height*0.95, width:canvas.width*0.05, height:canvas.height*0.06};
        this.drawController();
        this.drawTable();
    }

    this.drawTable = function() {
        for(let i of [0.5, 0.08, 0.58]) {
            ctx.beginPath();
            ctx.moveTo(canvas.width*i, 0);
            ctx.lineTo(canvas.width*i, canvas.height*0.9);
            ctx.stroke();
        }
        for(let i=0; i<10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height*0.09*(i+1));
            ctx.lineTo(canvas.width, canvas.height*0.09*(i+1));
            ctx.stroke();
            
            ctx.font = canvas.height*0.06 + "px Arial";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            if (this.problemList[i+((this.currentPage-1)*20)]) {
                ctx.fillText(this.problemList[i+((this.currentPage-1)*20)].number, canvas.width*0.04, canvas.height*0.09*(i+0.5), canvas.width*0.075);
                ctx.fillText(this.problemList[i+((this.currentPage-1)*20)].answer, canvas.width*0.29, canvas.height*0.09*(i+0.5), canvas.width*0.42);
            }
            if (this.problemList[i+10+((this.currentPage-1)*20)]) {
                ctx.fillText(this.problemList[i+10+((this.currentPage-1)*20)].number, canvas.width*0.54, canvas.height*0.09*(i+0.5), canvas.width*0.075);
                ctx.fillText(this.problemList[i+10+((this.currentPage-1)*20)].answer, canvas.width*0.79, canvas.height*0.09*(i+0.5), canvas.width*0.42);
            }
        }
    }

    this.drawController = function() {
        ctx.beginPath();
        ctx.moveTo(this.btnPos.triangle.leftX, this.btnPos.triangle.leftY);
        ctx.lineTo(this.btnPos.triangle.leftX+this.btnPos.triangle.width, this.btnPos.triangle.leftY-this.btnPos.triangle.height/2);
        ctx.lineTo(this.btnPos.triangle.leftX+this.btnPos.triangle.width, this.btnPos.triangle.leftY+this.btnPos.triangle.height/2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.btnPos.triangle.rightX, this.btnPos.triangle.rightY);
        ctx.lineTo(this.btnPos.triangle.rightX-this.btnPos.triangle.width, this.btnPos.triangle.rightY-this.btnPos.triangle.height/2);
        ctx.lineTo(this.btnPos.triangle.rightX-this.btnPos.triangle.width, this.btnPos.triangle.rightY+this.btnPos.triangle.height/2);
        ctx.fill();

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.btnPos.home.startX, this.btnPos.home.startY, this.btnPos.home.endX-this.btnPos.home.startX, this.btnPos.home.endY-this.btnPos.home.startY);

        const txtX = this.btnPos.home.startX+(this.btnPos.home.endX-this.btnPos.home.startX)/2;
        const txtY = this.btnPos.home.startY+(this.btnPos.home.endY-this.btnPos.home.startY)/2;
        const maxWidth = (this.btnPos.home.endX-this.btnPos.home.startX)*0.9;
        ctx.font = canvas.height*0.04 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("HOME", txtX, txtY, maxWidth);
    }

    this.expandImage = function(event) {
        for(let i=0; i<this.problemList.length; i++){
            const minX = canvas.width*(0.08+(Math.floor(i/10)%2)*0.5);
            const minY = canvas.height*0.09*(i%10);
            const maxX = canvas.width*(0.5+(Math.floor(i/10)%2)*0.5);
            const maxY = canvas.height*(0.09*(i%10)+0.09);
            if(event.isPrimary && minX<event.pageX && event.pageX<maxX && minY<event.pageY && event.pageY<maxY){
                let selectedImage = new Image();
                let self = this;
                selectedImage.onload = function(event) {
                    if(self.isExpanded) {
                        const ratio = selectedImage.height/selectedImage.width;
                        const expanedImageAreaHeight = canvas.height*0.9;
                        ctx.clearRect(0,0,canvas.width,expanedImageAreaHeight);
                        if(canvas.width*ratio > expanedImageAreaHeight) {
                            ctx.drawImage(selectedImage, canvas.width/2-(expanedImageAreaHeight/ratio)/2, 0, expanedImageAreaHeight/ratio, expanedImageAreaHeight);
                        } else {
                            ctx.drawImage(selectedImage, 0, expanedImageAreaHeight/2-canvas.width*ratio/2, canvas.width, canvas.width*ratio);
                        }
                    }
                }
                selectedImage.src = this.problemList[i+((this.currentPage-1)*20)].problem;
                this.isExpanded = true;
                return;
            }
        }
        return;
    }

    this.onPointerUp = function(event) {
        this.isExpanded = false;
        const isLeftArrow = this.btnPos.triangle.leftX<event.pageX && event.pageX<this.btnPos.triangle.leftX+this.btnPos.triangle.width && this.btnPos.triangle.leftY-this.btnPos.triangle.height/2<event.pageY && event.pageY<this.btnPos.triangle.leftY+this.btnPos.triangle.height/2;
        const isRightArrow = this.btnPos.triangle.rightX>event.pageX && event.pageX>this.btnPos.triangle.rightX-this.btnPos.triangle.width && this.btnPos.triangle.rightY-this.btnPos.triangle.height/2<event.pageY && event.pageY<this.btnPos.triangle.rightY+this.btnPos.triangle.height/2;
        const isHome = this.btnPos.home.startX<event.pageX && event.pageX<this.btnPos.home.endX && this.btnPos.home.startY<event.pageY && event.pageY<this.btnPos.home.endY;
        if (event.isPrimary && isLeftArrow){
            if(this.currentPage>1) {
                this.currentPage--;
                this.update();
            }
        } else if (event.isPrimary && isRightArrow){
            if(this.currentPage<Math.ceil(this.problemList.length/20)) {
                this.currentPage++;
                this.update();
            }
        } else if (event.isPrimary && isHome){
            this.clearLI();
            screenObject = null;
            screenObject = new MainPage();
        } else if (event.isPrimary){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            this.update();
        }
    }

    this.clearLI = function() {
        window.removeEventListener('resize', this.resizeEventFunction);
        canvas.removeEventListener('pointerdown', this.pointerDownEventFunction);
        window.removeEventListener('pointerup', this.pointerUpEventFunction);
        window.removeEventListener('pointercancel', this.pointerUpEventFunction);
    }

    this.resizeEventFunction = this.update.bind(this);
    this.pointerDownEventFunction = this.expandImage.bind(this);
    this.pointerUpEventFunction = this.onPointerUp.bind(this);
    window.addEventListener('resize', this.resizeEventFunction);
    canvas.addEventListener('pointerdown', this.pointerDownEventFunction);
    window.addEventListener('pointerup', this.pointerUpEventFunction);
    window.addEventListener('pointercancel', this.pointerUpEventFunction);

    this.update();
}

function Sound() {
    this.sound = document.createElement("audio");
    this.sound.src = "data:audio/mp3;base64,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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uAxOcAJQHROfm9FAgAADSDgAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    let endedFunction = function() {
        this.sound.currentTime = 0;
    }.bind(this);
    this.sound.addEventListener('ended', endedFunction);
}
