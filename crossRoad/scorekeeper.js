console.log("loading powerup.js")

AFRAME.registerComponent('scorekeeper', {
  schema: {
    target: {type: 'selector', default:"#timer"},
    timeleft: {type: 'number', default:20},
  },


  init: function() {
    const component = this
    console.log(this.data.timeleft)
    let z = new Date()
    this.startTime = z.getTime()
    this.gameLength = this.data.timeleft // time you have left to play (in seconds)
    this.gameOver = false

    this.timer = document.querySelector("#timer")
    this.avatar = document.querySelector("#avatar")
    this.collisionHandler = (e) => {
         console.log('just collided with something')
         component.otherBody = e.detail.body
    }
    this.el.addEventListener('collide', this.collisionHandler);
  },

  tick: function(uptime,delta) {

    let z = new Date()
    let t = (z.getTime()-this.startTime)/1000
    let timeLeft = this.gameLength - t

    if (this.avatar) {

      let pos = this.avatar.object3D.position

      if (pos.x >  50) pos.x=  50
      if (pos.x < -50) pos.x= -50
      if (pos.z >  150) pos.z=  150
      if (pos.z < -150) pos.z= -150
      //pos.set(position)
    } 

    timer.setAttribute('text','value',
           " You are almost late! Rush to office! \n Time: "
           + Math.round(timeLeft)
                    )

    if (timeLeft <0) {
     this.gameOver=true
     timer.setAttribute('text','value',"TIMESUP! YOU ARE LATE!")
    }

    if (this.gameOver){
      timer.setAttribute('text','value',"Next day...")
      this.el.object3D.position.y = 10 // move the avatar above the board!
      window.location.href = '/index.html'; 
    }
  }

});
