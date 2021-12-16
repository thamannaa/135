song="";
img="";
status_object="";
objects=[];
function preload(){
song=loadSound("alarm.mp3");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting object";
}

function modelLoaded(){
    console.log("model loaded!");
    status_object=true;
  
}

function gotresults(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}

function draw(){
image(video,0,0,380,380);
if(status_object!=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotresults);
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status:object detected";
        fill(r,g,b);
        percent=floor(objects[0].confidence*100);
        text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label=="person"){
            document.getElementById("number_of_objects").innerHTML="baby found";
            song.stop();
        }
        else{
            document.getElementById("number_of_objects").innerHTML="baby not found";
            song.play();
        }
    }
    if(objects.length==0){
        document.getElementById("number_of_number").innerHTML="baby not found";
        song.play();
    }
}

}