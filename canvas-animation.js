function DropAnimation(options){
  let targetDom  = document.querySelector(options.el);
  this.canvas = targetDom.getContext('2d');
  this.width = targetDom.width;
  this.height = targetDom.height;
  this.color = options.color;
  this.count = options.count;
  this.speed = options.speed;
  this.dropArray = [];
  this.type = options.type;
  this.init();
  if(this.type == 'snow'){        
    this.snowAnimation();
  }
  else if(this.type == 'rain'){     
    this.rainAnimation();
  }
}
      //倾斜角度
      DropAnimation.prototype.angel = 15;

      //角度转弧度
      DropAnimation.prototype.radian = function(){
        return Math.sin(Math.PI*this.angel/180);
      }

      //初始化元素
      DropAnimation.prototype.init = function(){
        if(this.type == 'snow'){
          for(let i = 0; i < this.count; i++){
            this.dropArray.push({
              x: Math.random()*(this.width+this.height*Math.tan(this.radian())),
              y: Math.random()*(-this.height),
              speed: Math.random()*2 + this.speed,
              radius: Math.random()*3+1
            }) 
          }
        }
        else if(this.type == 'rain'){
          for(let i = 0; i < this.count; i++){
            this.dropArray.push({
              x: Math.random()*(this.width+this.height*Math.tan(this.radian())),
              y: Math.random()*(-this.height),
              speed: Math.random()*2 + this.speed,
              length: 20
            }) 
          }
        }
      }

      //下雨
      DropAnimation.prototype.rainAnimation = function(){
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.dropArray.map((item)=>{
          if(item.y > this.height || item.x < 0){
            item.y = 0;
            item.x = Math.random()*(this.width+this.height*Math.tan(this.radian()));
          }
          this.canvas.beginPath();
          this.canvas.lineWidth = 2;
          this.canvas.strokeStyle = this.color
          this.canvas.moveTo(item.x, item.y);
          this.canvas.lineTo(item.x - item.length*Math.sin(this.radian()), item.y + item.length*Math.cos(this.radian()));
          this.canvas.stroke();
          item.x = item.x - item.speed*Math.sin(this.radian());
          item.y = item.y + item.speed*Math.cos(this.radian());
        })
        
        requestAnimationFrame(()=>{
          this.rainAnimation()
        })
      }

      //下雪
      DropAnimation.prototype.snowAnimation = function(){
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.dropArray.map((item)=>{
          if(item.y > this.height || item.x < 0){
            item.y = 0;
            item.x = Math.random()*(this.width+this.height*Math.tan(this.radian()));
          }
          this.canvas.beginPath();
          this.canvas.fillStyle = this.color;
          this.canvas.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
          this.canvas.fill();
          item.x = item.x - item.speed*Math.sin(this.radian());
          item.y = item.y + item.speed*Math.cos(this.radian());
        });
        requestAnimationFrame(()=>{
          this.snowAnimation()
        })
      }