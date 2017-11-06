var xmlhttp = new XMLHttpRequest();

// object containing the JSON Data
var myObj;

// Function parses the JSON Data
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        var listDiv = document.getElementById('phones');
        var ul=document.createElement('ul');
        var count = Object.keys(myObj).length; // first count
        var count2 = Object.keys(myObj[0].specs).length; // specs count
        ul.className = " products-list";
        for (var i = 0; i <= count-1; ++i) {
            var li=document.createElement('li');
            li.className = 'phoneList'
            
            var a = document.createElement("a");
            a.setAttribute('href', "#");
            a.className = " product-photo";
            
            var img = document.createElement("img");
            img.src = myObj[i].image.small;
            img.height = 160;
            
            var h2 = document.createElement("h2");
            h2.innerHTML = myObj[i].name;
            
            var div = document.createElement('div');
            div.id = "description";
            
            // appending
            ul.appendChild(li);
            li.appendChild(a);
            a.appendChild(img);
            li.appendChild(h2);
            li.appendChild(div);
            var ul2 = document.createElement('ul');
            ul2.className = "product-description"; // list inside the list
            li.appendChild(ul2);
            
            var li2 = document.createElement('li');
            var li3 = document.createElement('li');
            var li4 = document.createElement('li');
            var li5 = document.createElement('li');
            var li6 = document.createElement('li');
            
            
            li2.innerHTML = "<span>Manufacturer: </span>" + myObj[i].specs.manufacturer;
            li3.innerHTML = "<span>Storage: </span>" + myObj[i].specs.storage;
            li4.innerHTML = "<span>OS: </span>" + myObj[i].specs.os;
            li5.innerHTML = "<span>Camera: </span>" + myObj[i].specs.camera;
            li6.innerHTML = "<b>Description: </b>" + myObj[i].description;
            $(li).attr("data-category", myObj[i].specs.manufacturer.toLowerCase()+ " " + myObj[i].specs.storage + " " + myObj[i].specs.os.toLowerCase() + " " + myObj[i].specs.camera);
            
            ul2.appendChild(li2);
            ul2.appendChild(li3);
            ul2.appendChild(li4);
            ul2.appendChild(li5);
            ul2.appendChild(li6);
            
        }
        listDiv.appendChild(ul);
    }
    
    
};


var $filterCheckboxes = $('input[type="checkbox"]');

$filterCheckboxes.on('change', function() {
                     
var selectedFilters = {};
                     
$filterCheckboxes.filter(':checked').each(function() {
                                                               
if (!selectedFilters.hasOwnProperty(this.name)) {
    selectedFilters[this.name] = [];
   }
                                                               
selectedFilters[this.name].push(this.value);
});
                     
                     
var $filteredResults = $('.phoneList');
                     
// loop over the selected filter name -> (array) values pairs
$.each(selectedFilters, function(name, filterValues) {
                            
// filter each .phoneList element
$filteredResults = $filteredResults.filter(function() {
                                                                       
var matched = false,
currentFilterValues = $(this).data('category').split(' ');
                                                                       
// loop over each category value in the current .phoneList's data-category
$.each(currentFilterValues, function(_, currentFilterValue) {
                                                                              
// if the current category exists in the selected filters array
// set matched to true, and stop looping. as we're ORing in each
// set of filters, we only need to match once
                                                                              
if ($.inArray(currentFilterValue, filterValues) != -1) {
       matched = true;
       return false;
}
});
// if matched is true the current .phoneList element is returned
return matched;
       });
});
                     
                     
$('.phoneList').hide().filter(function(){
                                                   
if($filteredResults.length > 0){
                                                   
  $('p').text("");
return $filteredResults.show()
}else{
$('.phoneList').hide();
$('p').text("Oh no! Nothing matches your filter criteria.");
}
   });
                     
});






xmlhttp.open("GET", "products.json", true);
xmlhttp.send();

