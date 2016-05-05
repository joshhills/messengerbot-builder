/* DOM altering methods to respond to user input. */
            
/*
 * Keep a local counter to prevent logistic
 * confusion relating to doubly-nested
 * accordion elements.
 */
var eventCount = 1;

/*
 * Disable/Enable an input
 * based on the value of
 * a checkbox.
 * 
 * @param cb    The checkbox.
 */
function toggleInputActive(cb) {
    
    // Is the checkbox is on...
    if($(cb).is(':checked')) {
        // Disable the previous textbox.
        $(cb).parent().parent().parent().find('input.form-control').attr('disabled','');
    }
    else {
        // Enable the previous textbox.
        $(cb).parent().parent().parent().find('input.form-control').removeAttr('disabled');
    }
    
}

/*
 * Add new button building dialogue
 * to the current section.
 * 
 * @param element   Position of add button.
 */
function addButtonBuildDialog(element) {

    // Store the URL button dialogue HTML string.
    var addURLButtonHTMLString = '<div class="card add-button"> <div class="card-header card-primary" style="color: white;"> Button <button aria-label="Close" class="close" type="button" onclick="removeButton(this)"><span aria-hidden="true" style="color: white;">&times;</span></button> </div><div class="card-block"> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to denote this particular button on the element, added as a comment.</small> </fieldset> <div class="btn-group btn-block" data-toggle="buttons"> <label onclick="switchButtonOptions(this)" class="btn btn-primary-outline active" style="width: 50%;"><input class="url-button" checked name="button-options" type="radio">URL</label> <label onclick="switchButtonOptions(this)" class="btn btn-primary-outline" style="width: 50%;"><input class="postback-button" onclick="switchButtonOptions(this)" name="button-options" type="radio">Postback</label> </div><div class="button-type-controls"> <input type="text" class="form-control m-t-1" placeholder="URL Title"> <input type="text" class="form-control m-t-1" placeholder="URL"><!-- Repetition of the button --><div class="form-group m-t-1"><div class="input-group"><span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span><span class="input-group-addon">Repeat Times:</span><input aria-label="Text input with checkbox." class="form-control"placeholder="0" type="text"></div></div></div></div></div>';

    // Store the postback button dialogue HTML string.
    var addPostbackButtonHTMLString = '<div class="card add-button"> <div class="card-header card-primary" style="color: white;"> Button <button aria-label="Close" class="close" type="button" onclick="removeButton(this)"><span aria-hidden="true" style="color: white;">&times;</span></button> </div><div class="card-block"> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to denote this particular button on the element, added as a comment.</small> </fieldset> <div class="btn-group btn-block" data-toggle="buttons"> <label onclick="switchButtonOptions(this)" class="btn btn-primary-outline" style="width: 50%;"><input class="url-button" name="button-options" type="radio">URL</label> <label onclick="switchButtonOptions(this)" class="btn btn-primary-outline active" style="width: 50%;"><input class="postback-button" onclick="switchButtonOptions(this)" name="button-options" type="radio" checked>Postback</label> </div><div class="button-type-controls"> <input class="form-control m-t-1" placeholder="Title" type="text"> <input class="form-control m-t-1" placeholder="Payload" type="text"> <!-- Repetition of the button --><div class="form-group m-t-1"><div class="input-group"><span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span><span class="input-group-addon">Repeat Times:</span><input aria-label="Text input with checkbox." class="form-control"placeholder="0" type="text"></div></div></div></div></div>';

    // If URL button has been specifically selected...
    if($(element).hasClass('url-button')) {
        // Insert dialogue in the correct place.
        $(element).parent().parent().before(addURLButtonHTMLString);
    }
    else if ($(element).hasClass('postback-button')) {
        // Insert dialogue in the correct place.
        $(element).parent().parent().before(addPostbackButtonHTMLString);
    }
    else {
        // Insert dialogue in the correct place.
        $(element).parent().before(addURLButtonHTMLString);
    }

}

/*
 * Swap the button UI dependent on the
 * kind of button requested.
 * 
 * @param element   The radio selected.
 */
function switchButtonOptions(element) {

    // Either the user has selected an URL button...
    if($(element).find('input').hasClass('url-button')) {
        // Insert the correct input options.
        $(element).parent().next().html('<input type="text" class="form-control m-t-1" placeholder="URL Title">'
                            + '<input type="text" class="form-control m-t-1" placeholder="URL"><!-- Repetition of the button --><div class="form-group m-t-1"><div class="input-group"><span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span><span class="input-group-addon">Repeat Times:</span><input aria-label="Text input with checkbox." class="form-control"placeholder="0" type="number" min="0"></div></div>');
    }
    // Or a postback button...
    else {
        // Insert the correct input options.
        $(element).parent().next().html('<input class="form-control m-t-1" placeholder="Title" type="text">'
                            + '<input class="form-control m-t-1" placeholder="Payload" type="text"><!-- Repetition of the button --><div class="form-group m-t-1"><div class="input-group"><span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span><span class="input-group-addon">Repeat Times:</span><input aria-label="Text input with checkbox." class="form-control"placeholder="0" type="number" min="0"></div></div>');
    }

}

/*
 * Remove the button being built.
 * 
 * @param element   The button selected.
 */
function removeButton(element) {
    $(element).parent().parent().remove();
}

/*
 * Swap the trigger UI dependent on the
 * kind of trigger requested.
 * 
 * @param element   The radio selected.
 */
function switchTriggerType(element) {

    // Either the user has selected a text-based trigger...
    if($(element).hasClass('trigger-option-text')) {
        // Insert the correct input options.
        $(element).parent().next().html('<div class="form-group"> <input class="form-control m-t-1 m-b-1 form-control-warning" placeholder="String of text." type="text" /> <div class="checkbox-inline"> <label> <input type="checkbox" checked/> Exact match. </label> </div> <div class="checkbox-inline"> <label> <input type="checkbox" onclick="toggleInputActive(this)"/> Catch-all (any text). </label> </div></div>');
    }
    // Or a person-based trigger...
    else if($(element).hasClass('trigger-option-person')) {
        // Insert the correct input options.
        $(element).parent().next().html('<form class="m-t-1"> <div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="First Name" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Surname" type="text"> </div></div></form>');
    }
    // Or a postback-based trigger...
    else {
        // Insert the correct input options.
        $(element).parent().next().html('<div class="form-group"><input class="form-control m-t-1" placeholder="Payload Identifier" type="text"></div><div class="checkbox-inline"> <label> <input type="checkbox" onclick="toggleInputActive(this)"/> Catch-all (any postback). </label> </div>');
    }

}

/*
 * Add an event to the trigger's
 * accordion and produce dialog.
 * 
 * @param element   Button to insert above.
 */
function addEvent(element) {

    // Increment the counter.
    eventCount++;

    // Store the HTML necessary to produce a new event.
    var eventListingHTML = '<div class="panel panel-default"> <div class="panel-heading" role="tab"> <hr/> <h6 class="card-subtitle text-muted" style="display: inline-block;"> <a aria-controls="trigger-event-' + eventCount + '" aria-expanded="true" data-parent="#trigger-accordion-1" data-toggle="collapse" href="#trigger-event-' + eventCount + '">Event</a></h6> <button aria-label="Close" class="close pull-xs-right" type="button" onclick="removeEvent(this)"><span aria-hidden="true">&times;</span></button> <hr/> </div><div class="panel-collapse collapse" id="trigger-event-' + eventCount + '" role="tabpanel"> <label for="trigger-precode">Precode:</label> <div class="checkbox-inline pull-xs-right"> <label><input type="checkbox">Include</label> </div><textarea class="form-control m-b-1" id="comment" rows="4" placeholder="Here you can set up local variables (potentially using external API calls) to reference using parentheses in scope in the following fields."></textarea> <ul class="nav nav-tabs m-b-1" role="tablist"> <li class="nav-item"> <a class="nav-link plain-text active" data-toggle="tab" href="#trigger-text-' + eventCount + '" role="tab">Plain Text</a> </li><li class="nav-item"> <a class="nav-link structured-content" data-toggle="tab" href="#trigger-structured-' + eventCount + '" role="tab">Structured Content</a> </li></ul> <div class="tab-content"> <div class="tab-pane fade in active" id="trigger-text-' + eventCount + '" role="tabpanel"> <form> <div class="form-group"> <input class="form-control" id="trigger-plaintext" placeholder="Reply with a plain text message." type="text"> </div></form> </div><div class="tab-pane fade" id="trigger-structured-' + eventCount + '" role="tabpanel"> <div class="card trigger-element"> <div class="card-header"> Element <button aria-label="Close" class="close" type="button" onclick="removeTriggerElement(this)"><span aria-hidden="true">&times;</span></button> </div><div class="structured-bubble card-block"> <form> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to denote this particular message element, added as a comment.</small> </fieldset> <div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Title" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Subtitle" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Item URL" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Image URL" type="text"> </div></div></form> <div class="btn-group"> <button class="btn btn-secondary" type="button" onclick="addButtonBuildDialog(this)">Add Button</button> <button aria-expanded="false" aria-haspopup="true" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" type="button"><span class="sr-only">Toggle Button Dropdown</span></button> <div class="dropdown-menu"> <a class="dropdown-item url-button" onclick="addButtonBuildDialog(this)">URL</a> <a class="dropdown-item postback-button" onclick="addButtonBuildDialog(this)">Postback</a> </div></div></div></div><button class="btn btn-primary m-b-1" type="button" onclick="addEventElement(this)">Add Element</button> </div><hr/> </div></div></div>';

    // Insert the new listing at the end of the accordion.
    $(element).prev().append(eventListingHTML);

}

/*
 * Add a trigger event element.
 * 
 * @param element   Button to insert above.
 */
function addEventElement(element) {

    // Store the element construction dialog HTML.
    var elementConstructionHTML = '<div class="card trigger-element"> <div class="card-header"> Element <button aria-label="Close" class="close" type="button" onclick="removeTriggerElement(this)"><span aria-hidden="true">&times;</span></button> </div><div class="structured-bubble card-block"> <form> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to denote this particular message element, added as a comment.</small> </fieldset> <div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Title" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Subtitle" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Item URL" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Image URL" type="text"> </div></div></form> <div class="btn-group"> <button class="btn btn-secondary" type="button" onclick="addButtonBuildDialog(this)">Add Button</button> <button aria-expanded="false" aria-haspopup="true" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" type="button"><span class="sr-only">Toggle Button Dropdown</span></button> <div class="dropdown-menu"> <a class="dropdown-item url-button" onclick="addButtonBuildDialog(this)">URL</a> <a class="dropdown-item postback-button" onclick="addButtonBuildDialog(this)">Postback</a> </div></div></div></div>';

    // Inser a new dialogue prior to the button.
    $(element).before(elementConstructionHTML);

}

/*
 * Remove a trigger event element.
 * 
 * @param element   Element to remove.
 */
function removeTriggerElement(element) {
    $(element).parent().parent().remove();   
}

/*
 * Remove a response element
 * from a trigger event.
 * 
 * @param element   Response to remove.
 */
function removeEvent(element) {

    // Get the ID of the parent accordion.
    var accordionID = $(element).parent().parent().attr('id');

    // Get the ID of the event.
    var eventID = $(element).parent().find('a').attr('aria-controls');

    // Remove the dialog.
    $('#' + eventID).remove();

    // Remove the listing from the accordion.
    $(element).parent().parent().remove();

}

/*
 * Add a new trigger to the
 * chatbot.
 * 
 * @param element   Button to insert above.
 */
function addTrigger(element) {

    // Increase the abritrary counter to not confuse IDs.
    eventCount++;

    // Store the HTML necessary to build an entirely new trigger (huge!).
    var triggerHTML = '<div class="card user-trigger"> <div class="card-header card-primary" style="color: white;"> Trigger <button aria-label="Close" class="close" type="button"><span aria-hidden="true" style="color: white;" onclick="removeTrigger(this)">&times;</span></button> </div><ul class="list-group list-group-flush"> <li class="list-group-item"> <div class="card-block"> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to identify this particular trigger event; this will manifest as function naming and commenting.</small> </fieldset> <h6 class="card-subtitle">Choose the type...</h6><br><div class="btn-group btn-block set-trigger-type" data-toggle="buttons"> <label class="btn btn-primary-outline trigger-option-text" style="width: 33%;" onclick="switchTriggerType(this)"><input name="trigger-options" type="radio">Text Contains</label> <label class="btn btn-primary-outline trigger-option-person" style="width: 33%;" onclick="switchTriggerType(this)"><input name="trigger-options" type="radio">Specific Person</label> <label class="btn btn-primary-outline trigger-option-postback" style="width: 33%;" onclick="switchTriggerType(this)"><input name="trigger-options" type="radio">Postback</label> </div><div class="trigger-options"> </div></div></li><li class="list-group-item"> <div class="card-block"> <h6 class="card-subtitle">Add response events...</h6><br><div id="trigger-accordion-' + eventCount + '" role="tablist"> <div class="panel panel-default"> <div class="panel-heading" role="tab"> <hr/> <h6 class="card-subtitle text-muted" style="display: inline-block;"> <a aria-controls="trigger-event-' + eventCount + '" aria-expanded="true" data-parent="#trigger-accordion-' + eventCount + '" data-toggle="collapse" href="#trigger-event-' + eventCount + '">Event</a></h6> <button aria-label="Close" class="close pull-xs-right" type="button" onclick="removeEvent(this)"><span aria-hidden="true">&times;</span></button> <hr/> </div><div class="panel-collapse collapse" id="trigger-event-' + eventCount + '" role="tabpanel"> <label for="trigger-precode">Precode:</label> <div class="checkbox-inline pull-xs-right"> <label><input type="checkbox">Include</label> </div><textarea class="form-control m-b-1" id="comment" rows="4" placeholder="Here you can set up local variables (potentially using external API calls) to reference using parentheses in scope in the following fields."></textarea> <ul class="nav nav-tabs m-b-1" role="tablist"> <li class="nav-item"> <a class="nav-link plain-text active" data-toggle="tab" href="#trigger-text" role="tab">Plain Text</a> </li><li class="nav-item"> <a class="nav-link structured-content" data-toggle="tab" href="#trigger-structured" role="tab">Structured Content</a> </li></ul> <div class="tab-content"> <div class="tab-pane fade in active" id="trigger-text" role="tabpanel"> <form> <div class="form-group"> <input class="form-control" id="trigger-plaintext" placeholder="Reply with a plain text message." type="text"> </div></form> </div><div class="tab-pane fade" id="trigger-structured" role="tabpanel"> <div class="card trigger-element"> <div class="card-header"> Element <button aria-label="Close" class="close" type="button" onclick="removeTriggerElement(this)"><span aria-hidden="true">&times;</span></button> </div><div class="structured-bubble card-block"> <form> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to denote this particular message element, added as a comment.</small> </fieldset> <div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Title" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Subtitle" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Item URL" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Image URL" type="text"> </div></div></form> <div class="btn-group"> <button class="btn btn-secondary" type="button" onclick="addButtonBuildDialog(this)">Add Button</button> <button aria-expanded="false" aria-haspopup="true" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" type="button"><span class="sr-only">Toggle Button Dropdown</span></button> <div class="dropdown-menu"> <a class="dropdown-item url-button" onclick="addButtonBuildDialog(this)">URL</a> <a class="dropdown-item postback-button" onclick="addButtonBuildDialog(this)">Postback</a> </div></div></div></div><button class="btn btn-primary m-b-1" type="button" onclick="addEventElement(this)">Add Element</button> </div><hr/> </div></div></div></div><button class="btn btn-primary m-b-1 m-t-1" type="button" onclick="addEvent(this)"> Add Event</button> </div></li></ul> </div><br/>';

    // Insert a new trigger above the button.
    $(element).before(triggerHTML);

}

/*
 * Remove a trigger from the chatbot.
 * 
 * @param element   Trigger to remove.
 */
function removeTrigger(element) {

    // Remove break.
    $(element).parent().parent().parent().next().remove();

    // Remove trigger element.
    $(element).parent().parent().parent().remove();

}