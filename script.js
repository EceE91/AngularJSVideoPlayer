// Code goes here

angular.module('app',[]);

angular.module('app').controller('mainCtrl', function($scope){
  $scope.messages=[];
  $scope.handlePause = function(e){
    console.log(e);
    $scope.messages.push({text:'paused!'});
    console.log("paused!");
  }
});

// whenever you have an event that fires that Angular doesn't know about such as 
// an HTML elements event that you start a digest cycle by calling scope.$apply 

angular.module('app').directive('eventPause', function($parse){
  return{
    restrict:'A',
    //scope:{ // isolated scope
      //eventPause: '&' //function
    //},
    
    // listen pause event
    link:function(scope, el, attrs){
      var fn = $parse(attrs['eventPause']); // attrs['eventPause'] aslında html tarafındaki handlePause() fonksiyonu demek, ama tabi bu bir string olarak görünüyor bu nedenle parse ettik
      
      el.on('pause', function(event){
        //if we dont start a digest cycle, then angular will not update any of 
        //its bindings because it doesn't know that someting has changed. External Event occured
        scope.$apply(function(){
          //scope.eventPause();
          fn(scope,{evt: event});
        })
      })
    }
  }
});


// in order to get and modify an attribute, directive returns a link function
angular.module('app').directive('spacebarSupport', function(){
  return{
    restrict:'A', // attribute <div my-directive-attribute></div>
    // keypress eventini dinlemek için link function eklemek gerekiyor
    link:function(scope, el, attrs){ // el is our video element and attrs is its attributes like preload, poster, id, etc 
      $('body').on('keypress',function(evt){
        var vidEl = el[0];
        if(evt.keyCode === 32 ){
          // play if paused, pause if it is playing
          if(vidEl.paused){
            vidEl.play(); //html5 video element feature
          }else{
            vidEl.pause();
          }
        }
      })
    }
  }
});