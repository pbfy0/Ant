function white(obj){
        return obj.data[0] == obj.data[1] && obj.data[1] == obj.data[2] && obj.data[2] == 255;
}
function sat(n, obj){
	for(i = 0; i < obj.width * obj.height * 4; i += 4){
		obj.data[i+0] = obj.data[i+1] = obj.data[i+2] = n;
		obj.data[i+3] = 255;
	}
	return obj;
}
function sta(a, obj){
	for(i = 0; i < obj.width * obj.height; i++){
	var j = i*4; // 4 bytes per pixel: rgba
		obj.data[j+0] = obj.data[j+1] = obj.data[j+2] = a[i] ? 255 : 0;
		obj.data[j+3] = 255;
	}
	return obj;
}
//function setBWPattern(pattern, obj){
//     for(i = 0; i < obj.width * obj.height * 4; i += 4){
//              obj.data[i+0] = obj.data[i+1] = obj.data[i+2] = pattern[i];
//      }
//      return obj;
//}
var interval;
var cp = 6;  //4;
var cw;
var ch;
//var cp = 2;
var ax;// = cw/2;
var ay;// = ch/2;
var aa = 0;
var canvas;
var ctx;
var black, white;

var use_truchet = true;
var use_lines = false;
var tr1, tr2;
var tr_a, tr_b, tr_c, tr_d;

var bwArray = [];
var bwId;
var nos = 0;

function step(){
//var id = ctx.createImageData(cp, cp);
//var id = (w) ? white : black;
var w = bwArray[ay][ax];
var id;
if(use_truchet){
//var id = (w) ? black : white;
//
if(use_lines){ 
if((ax + ay) % 2 == 0){
id = (w) ?  tr1 : tr2;
}else{
id = (w) ?  tr2 : tr1;
}
}else{
if((ax+ay)%2 == 0){
	id = (w)? tr_a: tr_c;
}else{
	id = (w)? tr_b: tr_d;
}
}
}
else{ // no truchet tiles
id = (w)? white: black;
}
//id.data[0] = id.data[1] = id.data[2] =  (w) ? 0 : 255;
//id = sat((w) ? 0 : 255, id);
aa += (w) ? 1 : -1;
//alert([w,ax*cp,ay*cp]);
ctx.putImageData(id, ax * cp, ay * cp);
bwArray[ay][ax] = !w;
	if(aa == -1){aa = 3}; // four directions 0,1,2,3
	aa %= 4;
	switch(aa){
		case 0:
			ay++;//= cp;
			break;
		case 1:
			ax++;//= cp;
			break;
		case 2:
			ay--;//= cp;
			break;
		case 3: 
			ax--;//= cp;
			break;
		default:
			break;
	}
	if(ax < 0){ax += cw}
	if(ax >= cw){ax -= cw}
        if(ay < 0){ay += ch}
        if(ay >= ch){ay -= ch}
nos++;
}
        function mf(x, val){
//		alert(typeof(val));
                var bw = val ? 255 : 0;
                return [bw, bw, bw, 255];
        }
function marray(input, times){
	var k;
	for(k = 0; k < times; k++){
		ta3 = ta3.concat(input);
	}
	return ta3;
}

var bid;
function pause(){
	clearInterval(interval)
	interval = undefined;
}
function play(){
//	interval = setInterval("step(); step(); step(); step(); step(); step(); step(); step(); step(); step()", 1);
	interval = setInterval(multistep, 1);
}
function load(x){
if(dc && x === undefined){return}
pause();
//interval = setInterval("step(); step(); step(); step(); step(); step(); step(); step(); step(); step()", 1);
canvas = document.getElementById("ac");
if(x === undefined/* && dc == false*/){
//canvas.width = window.innerWidth - 22;// - canvas.width % cp - 2;
canvas.height = window.innerHeight -22;// -  canvas.height % cp - 2;
canvas.width = canvas.height;
canvas.width -= canvas.width % cp;
canvas.height -= canvas.height % cp;
cw = canvas.width / cp; // number of rows
ch = canvas.height / cp; // number of columns
}else{
	canvas.width = cw * cp;
	canvas.height = ch * cp;
}
ctx = canvas.getContext("2d");
black = sat(0, ctx.createImageData(cp, cp));
white = sat(255, ctx.createImageData(cp, cp));
ctx.fillStyle = "#FFF";
ctx.fillRect(0, 0, cw * cp, ch * cp);
//}else{
//canvas.width = cw * cp;
//canvas.height = ch * cp;
//}
//cw -= cw % cp;
//ch -= ch % cp;
aa = 0;
ax = cw/2; // start in middle
ax -= ax%cp; // necessary?
ay = ch/2;  // start in middle
ay -= ay%cp; // necessary?
var cwa = new Array(cw);
var i;
for(i = 0; i < cwa.length; i++){
        cwa[i] = true;
}
//var i;
bwArray = new Array(ch);
for(i = 0; i < bwArray.length; i++){
	bwArray[i] = cwa.slice();
}
var j;
/*for(i = 0; i < ch * cp; i += cp){
	for(j = 0; j < cw * cp; j += cp){
		ctx.putImageData(tr1, i, j);
	}
}*/
//black = sat(0, ctx.createImageData(cp, cp));
//white = sat(255, ctx.createImageData(cp, cp));

ctx = canvas.getContext("2d");
black = sat(0, ctx.createImageData(cp, cp));
white = sat(255, ctx.createImageData(cp, cp));
if(cp == 4){
tr1 = sta([
true, false, true, true, 
false, true, true, true, 
true, true, true, false, 
true, true, false, true], ctx.createImageData(cp, cp));
tr2 = sta([
true, true, false, true,
true, true, true, false,
false, true, true, true,
true, false, true, true], ctx.createImageData(cp, cp));

tr1 = sta([
0,0,1,1,
0,1,1,0,
1,1,0,0,
1,0,0,1], ctx.createImageData(cp,cp));
tr2 = sta([
1,1,0,0,
0,1,1,0,
0,0,1,1,
1,0,0,1], ctx.createImageData(cp,cp));

tr_a = sta([
1,0,0,0,
0,0,0,0,
0,0,0,1,
0,0,1,1], ctx.createImageData(cp, cp));

tr_b = sta([
0,0,0,1,
0,0,0,0,
1,0,0,0,
1,1,0,0], ctx.createImageData(cp, cp));

tr_c = sta([
1,1,1,0,
1,1,1,1,
0,1,1,1,
0,0,1,1], ctx.createImageData(cp, cp));

tr_d = sta([
0,1,1,1,
1,1,1,1,
1,1,1,0,
1,1,0,0], ctx.createImageData(cp, cp));

}else if(cp == 6){
tr1 = sta([
0,0,1,0,0,0,
0,1,0,0,0,0,
1,0,0,0,0,0,
0,0,0,0,0,1,
0,0,0,0,1,0,
0,0,0,1,0,0], ctx.createImageData(cp,cp));

tr2 = sta([
0,0,0,1,0,0,
0,0,0,0,1,0,
0,0,0,0,0,1,
1,0,0,0,0,0,
0,1,0,0,0,0,
0,0,1,0,0,0], ctx.createImageData(cp,cp));

//tr2 = sta([], ctx.createImageData(cp, cp));
// truchet tiles, white (1) to ant's R.
// a: vert R
// b: horiz R
// c: vert L
// d: horiz L
tr_a = sta([ 
1,1,0,0,0,0,
1,0,0,0,0,0,
0,0,0,0,0,0,
0,0,0,0,0,1,
0,0,0,0,1,1,
0,0,0,1,1,1], ctx.createImageData(cp, cp));

tr_b = sta([
0,0,0,0,1,1,
0,0,0,0,0,1,
0,0,0,0,0,0,
1,0,0,0,0,0,
1,1,0,0,0,0,
1,1,1,0,0,0], ctx.createImageData(cp, cp));

tr_c = sta([
1,1,1,1,0,0,
1,1,1,1,1,0,
1,1,1,1,1,1,
0,1,1,1,1,1,
0,0,1,1,1,1,
0,0,0,1,1,1], ctx.createImageData(cp, cp));

tr_d = sta([
0,0,1,1,1,1,
0,1,1,1,1,1,
1,1,1,1,1,1,
1,1,1,1,1,0,
1,1,1,1,0,0,
1,1,1,0,0,0], ctx.createImageData(cp, cp));
}
//bwId = sat(255, ctx.createImageData(cw * cp, ch * cp));
ctx.fillStyle = "#FFF";
ctx.fillRect(0, 0, cw * cp, ch * cp);
for(i = 0; i < ch * cp; i += cp){
        for(j = 0; j < cw * cp; j += cp){
	if(! use_truchet){
	ctx.putImageData(white, i, j);
}else{
		if((j / cp + i / cp) % 2 == 0){
if(use_lines){
 ctx.putImageData(tr1, i, j);          
}else{
ctx.putImageData(tr_a, i, j);
}
		}else{
if(use_lines){
ctx.putImageData(tr2, i, j);
}else{
		ctx.putImageData(tr_b, i, j);
		}}
     }}
}
// play();


}
function spchandler(ev){
	if(ev.charCode != 32){return}	
	if(interval === undefined){
		play();
	}else{
		pause();
	}
}
var dc = false;
function multistep(){
	step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
        step();
//	draw();
}
function uv(){
	cp = parseInt(document.getElementById("pxs").value);
        cw = parseInt(document.getElementById("width").value) / cp;
        ch = parseInt(document.getElementById("height").value) / cp;
	dc = true;
	setTimeout(changable, 60000);
	load(true);
}
function changable(){
	dc = false;
}
function mf(el){
	var bw = (el) ? 255 : 0;
	return [bw, bw, bw, 255];
}
function amult(ar, t){
	var out = [];
	var i;
	for(i = 0; i < t; i++){
		out = out.concat(ar);
	}
	return out;
}
var oid;
function draw(){
	var i, j, ta;
	var out = [];
	for(i in bwArray){
		var a = bwArray[i].map(mf);
		ta = [];
		for(j in a){
			ta = ta.concat(amult(a[j], cp));
		}
		out = out.concat(amult(ta, cp));
	}
	oid = ctx.createImageData(cw * cp, ch * cp);
//	for(i in out){
		oid.data = out.slice();
//	}
	ctx.putImageData(oid, 0, 0);
}
