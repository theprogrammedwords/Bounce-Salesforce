({
    sortHelper: function(component, event, sortFieldName) {
        var currentDir = component.get("v.arrowDirection");
        
        if (currentDir == 'arrowdown') {
            component.set("v.arrowDirection", 'arrowup');
            component.set("v.isAsc", true);
        } else {
            component.set("v.arrowDirection", 'arrowdown');
            component.set("v.isAsc", false);
        }
        this.onLoad(component, event, sortFieldName);
    },
    onLoad: function(component, event, sortField) {
      //call apex class method
      var action = component.get('c.getbooks');
 
      // pass the apex method parameters to action 
      action.setParams({
         'sortField': sortField,
         'isAsc': component.get("v.isAsc")
      });
      action.setCallback(this, function(response) {
         //store state of response
         var state = response.getState();
         if (state === "SUCCESS") {
             
            //set response value in ListOfContact attribute on component.
            component.set('v.realbooking', response.getReturnValue());
            component.set('v.Booking', response.getReturnValue()); 
         }
      });
      $A.enqueueAction(action);
        
      var action = component.get('c.getmybike');
 
      // pass the apex method parameters to action 
      action.setParams({
         'sortField': sortField,
         'isAsc': component.get("v.isAsc")
      });
      action.setCallback(this, function(response) {
         //store state of response
         var state = response.getState();
         if (state === "SUCCESS") {
             
            //set response value in ListOfContact attribute on component.
            component.set('v.Bike', response.getReturnValue());
         }
      });
      $A.enqueueAction(action);
        
          
   },
    getbookingpagelist: function(component, pageNumber, pageSize) {
     var action = component.get("c.getbookdata");
        action.setParams({
            "pageNumber": pageNumber,
            "pageSize": pageSize
        });
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                component.set("v.Booking", resultData.booklist);
                component.set("v.PageNumber", resultData.pageNumber);
                component.set("v.TotalRecords", resultData.totalRecords);
                component.set("v.RecordStart", resultData.recordStart);
                component.set("v.RecordEnd", resultData.recordEnd);
                component.set("v.TotalPages", Math.ceil(resultData.totalRecords / pageSize));
            }
        });
        $A.enqueueAction(action);
    }
    
})
