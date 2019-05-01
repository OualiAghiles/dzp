// class Tabs {
//     /**
//      * 
//      * @param {string} selector 
//      */
//     constructor (selector) {
//         this.content = document.querySelector(selector)
//         this.menu = Array.prototype.slice.call(this.content.querySelectorAll('.tabs a'))
//         this.menu.forEach((elem) => {
//             elem.addEventListener('click', () => {
//                 this.changeLink(elem, true)
//             })
//         });
//         this.hashChange()
//         window.addEventListener('hashchange', () => {
//             this.hashChange()
//         })
//     }
//     /**
//      * 
//      * @param {HTMLElement} elem 
//      */
//     changeLink(elem, animation) {
//         if (animation === undefined) {
//             animation = true
//         }
//         let parent = elem.parentNode.parentNode
//         if (elem.parentNode.classList.contains('.is-active')) {
//             return false
//         } else {
//             parent.querySelector('.is-active').classList.remove('is-active')
//             elem.parentNode.classList.add('is-active')
//             let target = elem.getAttribute('href')
//             target = target.substr(1)
//             this.changeContent(target, animation)
//         }
//     }
//     /**
//      * 
//      * @param {href} target 
//      */
//     changeContent (target, animation) {
//         let tabContent =  this.content.querySelector('.tab_content.is-active')
//         let newContent = document.getElementById(target)

//         if(animation){
//             tabContent.classList.add('fade')
//             tabContent.offsetWidth
//             tabContent.classList.remove('in')
//             // call function with some browser call of the transitionend event
//             // add events
//             // event for majority
//             tabContent.addEventListener('transitionend', this.animation(tabContent, newContent))
//             // event for webkit
//             tabContent.addEventListener('webkitTransitionEnd', this.animation(tabContent, newContent))
//             // events for opera 10 / 12
//             tabContent.addEventListener('otransitionend', this.animation(tabContent, newContent))
//             tabContent.addEventListener('oTransitionEnd', this.animation(tabContent, newContent))
//         } else {
//             tabContent.classList.remove('is-active')
//             newContent.classList.add('is-active')
//         } 
//     }
//     /**
//      * 
//      * @param {string} activeTab 
//      * @param {tring} newTab 
//      */
//     animation (activeTab, newTab) {
//         activeTab.classList.remove('is-active')
//         activeTab.classList.remove('fade')
//         newTab.classList.add('is-active')
//         newTab.classList.add('fade')
//         newTab.offsetWidth
//         newTab.classList.add('in')
//         // remove events
//         // event for majority
//         activeTab.removeEventListener('transitionend', this.animation)
//         // event for webkit
//         activeTab.removeEventListener('webkitTransitionEnd', this.animation)
//         // events for opera 10 / 12
//         activeTab.removeEventListener('otransitionend', this.animation)
//         activeTab.removeEventListener('oTransitionEnd', this.animation) 
//     }
//     /**
//    * anonymous function - check the hash to target the right tab
//    *
//    * @param  {string} e hash relative to the href on the  link
//    * @return {string}   description
//    */
//    hashChange (e) {
//     var hash = window.location.hash
//     var link = document.querySelector('a[href ="'+hash+'"]')
//         if (link !== null && !link.parentNode.classList.contains('is-active')) {
//             this.changeLink(link, e !== undefined)
//         }
//     }
// }
// let tab = new Tabs('.tabs_block')