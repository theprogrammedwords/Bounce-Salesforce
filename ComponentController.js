
({  
    
    
    doInit : function(component, event, helper)
    {
       var pageNumber = component.get("v.PageNumber");  
       var pageSize = 10.00;
       helper.getbookingpagelist(component, pageNumber, pageSize);
    },
    
     onSelectChange : function(component, event, helper) {
        
       var pageNumber = component.get("v.PageNumber");  
       var pageSize = 10.00;
       helper.getbookingpagelist(component, pageNumber, pageSize);
        if(component.find("pageSize")!= undefined && component.find("pageSize") != null){
           var pageSize   = component.find("pageSize").get("v.value"); 
            helper.getbookingpagelist(component, pageNumber, pageSize);
      }
    },
    
    
    handleChange : function(component, event, helper) {
        
        var test = component.get("v.Booking");
        console.log(test.length);
        
        var myoption = component.get("v.values");
        var bool =[];
        
        console.log(myoption.length);
        for(let i = 0; i < myoption.length; i++){
            if(myoption[i] != undefined)
                bool.push(true);    
        }
        var dist = 3- myoption.length;
        while(dist> 0){
            bool.push(false);
            dist--;
        }
        
        var books = [];
        var badbooks = [];
        console.log('boolean is : '+bool[0] +' '+bool[1] +bool[2]   );
        
        
        for(let i=0; i < test.length; i++){
            
            console.log('data is : '+test[i].Bike__r.Active__c+' '+test[i].Bike__r.IsBooked__c+' '+test[i].Bike__r.DueToService__c);
            if(test[i].Bike__r.Active__c== bool[0] && test[i].Bike__r.IsBooked__c==bool[1] && test[i].Bike__r.DueToService__c==bool[2]){                    
                
                books.push(test[i]);
            }
            
        }
        component.set("v.Booking",books);
        
        var myoption = component.get("v.values");
        console.log(myoption.length);
        if(myoption.length ==0){

            var old = component.get("v.realbooking");
            component.set("v.Booking",old);
        }
        console.log(books.length);
        
    },
    
    doActionForBook : function(component, event) {
        
        var inputCmp = component.find("inputCmp");
        var value = inputCmp.get("v.value");
        var searchText = component.get('v.searchText');
        var books = [];
        var test = component.get("v.realbooking");
        
        
        var badbooks=[];
        for(let i=0; i<test.length;i++){
            var datatext = test[i].Customer__r.Name;
            datatext= datatext.toUpperCase();
            
            var text = searchText.toUpperCase();
            console.log(datatext+' '+text);
            if(datatext.includes(text)){
                console.log('hii');
                books.push(test[i]);	
            }
            else{
            var old = component.get("v.realbooking");
            component.set("v.Booking",old);
        }
        inputCmp.set("v.value",'');
        component.set("v.Booking",books); 
        }

    },
    doActionForBike : function(component, event) {
        
        
        var inputCmp = component.find("inputbike");
        var value = inputCmp.get("v.value");
        var searchText = component.get('v.searchBike');
        
        var action = component.get("c.searchForBike");
        action.setParams({searchText: searchText});
        var inputCmp = component.find("inputbike");
        
        action.setCallback(this, function(data){
            var state = data.getState();
            
            if (data.getReturnValue()!= null ) {
                console.log("Success to find");
                component.set("v.Bike",data.getReturnValue());                  
                console.log(data.getReturnValue());
                
            }
            else{
                console.log("search Failed");
                inputCmp.set("v.errors", [{message:"Person not found " +searchText}]);
                
            }
        });    
        
        
        $A.enqueueAction(action);
    },
    sortBookingNumber: function(component, event, helper) {
        component.set("v.selectedTabsoft", 'firstName');
        helper.sortHelper(component, event, 'Name');
    },
    
    sortCustomer: function(component, event, helper) {
        component.set("v.selectedTabsoft", 'custName');
        helper.sortHelper(component, event, 'Customer__r.Name');
    },  
    sortBikeName: function(component, event, helper) {
        component.set("v.selectedTabsoft", 'bikeName');
        helper.sortHelper(component, event, 'Bike__r.Name');
    }, 
    sortstarthub: function(component, event, helper) {
        component.set("v.selectedTabsoft", 'startHub');
        helper.sortHelper(component, event, 'StartHub__r.Name');
    }, 
    sortendhub: function(component, event, helper) {
        component.set("v.selectedTabsoft", 'endHub');
        helper.sortHelper(component, event, 'EndHub__r.Name');
    }, 
    sortdistance: function(component, event, helper) {
        component.set("v.selectedTabsoft", 'distance');
        helper.sortHelper(component, event, 'DistanceKMs__c');
    },
    loadbookinglist: function(component, event, helper) {
        
        helper.onLoad(component, event, 'Name');
    },
    
    sortBikeNumber: function(component, event, helper) {
        component.set("v.selectedTabsoftbike", 'bikenumber');
        helper.sortHelper(component, event, 'VehicleNo__c');
    },
    
    sortKMCovered: function(component, event, helper) {
        component.set("v.selectedTabsoftbike", 'kmcovered');
        helper.sortHelper(component, event, 'KMCovered__c');
    },  
    
    loadbookinglist: function(component, event, helper) {
        
        helper.onLoad(component, event, 'Name');
        helper.onLoad(component, event, 'VehicleNo__c');
        
    },
    
    handleNext: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.find("pageSize").get("v.value");
        pageNumber++;
        helper.getbookingpagelist(component, pageNumber, pageSize);
    },
    
    handlePrev: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.find("pageSize").get("v.value");
        pageNumber--;
        helper.getbookingpagelist(component, pageNumber, pageSize);
    },
    
    onSelectChange: function(component, event, helper) {
        var page = 1
        var pageSize = component.find("pageSize").get("v.value");
        helper.getbookingpagelist(component, page, pageSize);
    },
    
    
});
