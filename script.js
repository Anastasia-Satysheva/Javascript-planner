$(document).ready(function() {
    var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('#datetime')
    update();
    setInterval(update, 1000);
});
 
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');
    
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
        
        planTextArr = new Array(9);
    }
  
    let $plannerDiv = $('#plannerContainer');
    $plannerDiv.empty();
  
  
    for (let hour = 9; hour <= 17; hour++) {
      let index = hour - 9;
      
      let $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
      let $col2Div = $('<div>');
      $col2Div.addClass('col-md-2');
    
      const $timeBoxSpn = $('<span>');
      $timeBoxSpn.attr('class','timeBox');
      
      let displayHour = 0;
      let ampm = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
      } else {
        displayHour = hour;
        ampm = "am";
      }
      
      $timeBoxSpn.text(`${displayHour} ${ampm}`);
  
      $rowDiv.append($col2Div);
      $col2Div.append($timeBoxSpn);
  
      let $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyPlan');
  
      $dailyPlanSpn.val( planTextArr[index] );
      
      let $col9Div = $('<div>');
      $col9Div.addClass('col-md-9');
  
      $rowDiv.append($col9Div);
      $col9Div.append($dailyPlanSpn);
    
      let $col1Div = $('<div>');
      $col1Div.addClass('col-md-1');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"fas fa-save saveIcon");
      
      $rowDiv.append($col1Div);
      $col1Div.append($saveBtn);

      updateRowColor($rowDiv, hour);
      
      $plannerDiv.append($rowDiv);
    };
  
    function updateRowColor ($hourRow,hour) { 

      if ( hour < nowHour24) {
        $hourRow.css("background-color","#BBE5ED")
      } else if ( hour > nowHour24) {
        $hourRow.css("background-color","#98B6B1")
      } else {
        $hourRow.css("background-color","#F57269")
      }
    };
  
    $(document).on('click','i', function(event) {
      event.preventDefault();  

  
      let $index = $(this).attr('save-id');
  
      let inputId = '#input-'+$index;
      let $value = $(inputId).val();
  
      planTextArr[$index] = $value;
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  

    $(document).on('change','input', function(event) {
      event.preventDefault();
  
      let i = $(this).attr('hour-index');
  
    });
  });


  // For amimated title
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml1 .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
  }).add({
    targets: '.ml1 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  }).add({
    targets: '.ml1',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
