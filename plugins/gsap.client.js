import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";




export default ({app}, inject) => {

 inject('mouse', () => {

  let line1 = document.getElementById('scroll')
  if (line1){
    window.onscroll = ()=>{
      let pos = window.scrollY * 2.5
      console.log(pos)
      line1.style.left = `${pos}px`
      
    }
       
  }



  var follow =  document.querySelector('.follow')
  var cursor =   document.querySelector('.cursor')
  var linksA = document.getElementsByTagName("a");


  gsap.set(follow, { xPercent: -50, yPercent: -50 });
  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, 0.2, { x: e.clientX, y: e.clientY });
    gsap.to(follow, 0.9, { x: e.clientX, y: e.clientY });
  });
  Array.from(linksA).forEach(function (el) {
    el.addEventListener("mouseover", () => {
      gsap.to(cursor, 0.2, { scale: 1.5,autoAlpha: 0.5 });
    });
    el.addEventListener('mouseout',()=>{
      gsap.to(cursor,0.2,{
        scale:1,
        autoAlpha: 1
      })
    })
  });
})

  
}
