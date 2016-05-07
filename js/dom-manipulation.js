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
    var addURLButtonHTMLString = '<div class="card add-button"> <div class="card-header card-primary" style="color: white;"> Button <small class="text-muted" style="display: inline-block; color: white;"> (Max 3 per element)</small><button aria-label="Close" class="close" type="button" onclick="removeButton(this)"><span aria-hidden="true" style="color: white;">&times;</span></button> </div><div class="card-block"> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to denote this particular button on the element, added as a comment.</small> </fieldset> <div class="btn-group btn-block" data-toggle="buttons"> <label onclick="switchButtonOptions(this)" class="btn btn-primary-outline active" style="width: 50%;"><input class="url-button" checked name="button-options" type="radio">URL</label> <label onclick="switchButtonOptions(this)" class="btn btn-primary-outline" style="width: 50%;"><input class="postback-button" onclick="switchButtonOptions(this)" name="button-options" type="radio">Postback</label> </div><div class="button-type-controls"> <input type="text" class="form-control m-t-1" placeholder="URL Title (Max 20 Chars)"> <input type="text" class="form-control m-t-1" placeholder="URL"><!-- Repetition of the button --><div class="form-group m-t-1"><div class="input-group"><span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span><span class="input-group-addon">Repeat Times:</span><input aria-label="Text input with checkbox." class="form-control" placeholder="0" type="text"></div></div></div></div></div>';

    // Store the postback button dialogue HTML string.
    var addPostbackButtonHTMLString = '<div class="card add-button"> <div class="card-header card-primary" style="color: white;"> Button <small class="text-muted" style="display: inline-block; color: white;"> (Max 3 per element)</small><button aria-label="Close" class="close" type="button" onclick="removeButton(this)"><span aria-hidden="true" style="color: white;">&times;</span></button> </div><div class="card-block"> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to denote this particular button on the element, added as a comment.</small> </fieldset> <div class="btn-group btn-block" data-toggle="buttons"> <label onclick="switchButtonOptions(this)" class="btn btn-primary-outline" style="width: 50%;"><input class="url-button" name="button-options" type="radio">URL</label> <label onclick="switchButtonOptions(this)" class="btn btn-primary-outline active" style="width: 50%;"><input class="postback-button" onclick="switchButtonOptions(this)" name="button-options" type="radio" checked>Postback</label> </div><div class="button-type-controls"> <input class="form-control m-t-1" placeholder="Title" type="text"> <input class="form-control m-t-1" placeholder="Payload" type="text"> <!-- Repetition of the button --><div class="form-group m-t-1"><div class="input-group"><span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span><span class="input-group-addon">Repeat Times:</span><input aria-label="Text input with checkbox." class="form-control" placeholder="0" type="text"></div></div></div></div></div>';

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
        $(element).parent().next().html('<input type="text" class="form-control m-t-1" placeholder="URL Title (Max 20 Chars)">'
                            + '<input type="text" class="form-control m-t-1" placeholder="URL"><!-- Repetition of the button --><div class="form-group m-t-1"><div class="input-group"><span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span><span class="input-group-addon">Repeat Times:</span><input aria-label="Text input with checkbox." class="form-control" placeholder="0" type="text"></div></div>');
    }
    // Or a postback button...
    else {
        // Insert the correct input options.
        $(element).parent().next().html('<input class="form-control m-t-1" placeholder="Title (Max 20 Chars)" type="text">'
                            + '<input class="form-control m-t-1" placeholder="Payload" type="text"><!-- Repetition of the button --><div class="form-group m-t-1"><div class="input-group"><span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span><span class="input-group-addon">Repeat Times:</span><input aria-label="Text input with checkbox." class="form-control" placeholder="0" type="text"></div></div>');
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
    var eventListingHTML = '<div class="panel panel-default"> <div class="panel-heading" role="tab"> <hr/> <h6 class="card-subtitle text-muted" style="display: inline-block;"> <a aria-controls="trigger-event-' + eventCount + '" aria-expanded="true" data-parent="#trigger-accordion-1" data-toggle="collapse" href="#trigger-event-' + eventCount + '">Event</a></h6> <button aria-label="Close" class="close pull-xs-right" type="button" onclick="removeEvent(this)"><span aria-hidden="true">&times;</span></button> <hr/> </div><div class="panel-collapse collapse" id="trigger-event-' + eventCount + '" role="tabpanel"> <label for="trigger-precode">Precode:</label> <div class="checkbox-inline pull-xs-right"> <label><input type="checkbox">Include</label> </div><textarea class="form-control m-b-1" id="comment" rows="4" placeholder="Here you can set up local variables (potentially using external API calls) to reference using parentheses in scope in the following fields."></textarea> <ul class="nav nav-tabs m-b-1" role="tablist"> <li class="nav-item"> <a class="nav-link plain-text active" data-toggle="tab" href="#trigger-text-' + eventCount + '" role="tab">Plain Text</a> </li><li class="nav-item"> <a class="nav-link structured-content" data-toggle="tab" href="#trigger-structured-' + eventCount + '" role="tab">Structured Content</a> </li></ul> <div class="tab-content"> <div class="tab-pane fade in active" id="trigger-text-' + eventCount + '" role="tabpanel"> <form> <div class="form-group"> <input class="form-control" id="trigger-plaintext" placeholder="Reply with a plain text message." type="text"> </div></form> </div><div class="tab-pane fade" id="trigger-structured-' + eventCount + '" role="tabpanel"> <div class="card trigger-element"> <div class="card-header"> Element <small class="text-muted" style="display: inline-block"> (Max 10 Elements)</small><button aria-label="Close" class="close" type="button" onclick="removeTriggerElement(this)"><span aria-hidden="true">&times;</span></button> </div><div class="structured-bubble card-block"> <form> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to denote this particular message element, added as a comment.</small> </fieldset> <div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Title (Max 45 Chars)" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Subtitle (Max 80 Chars)" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Item URL" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Image URL" type="text"> </div></div></form> <div class="btn-group"> <button class="btn btn-secondary" type="button" onclick="addButtonBuildDialog(this)">Add Button</button> <button aria-expanded="false" aria-haspopup="true" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" type="button"><span class="sr-only">Toggle Button Dropdown</span></button> <div class="dropdown-menu"> <a class="dropdown-item url-button" onclick="addButtonBuildDialog(this)">URL</a> <a class="dropdown-item postback-button" onclick="addButtonBuildDialog(this)">Postback</a> </div></div></div></div><button class="btn btn-primary m-b-1" type="button" onclick="addEventElement(this)">Add Element</button> </div><hr/> </div></div></div>';

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
    var elementConstructionHTML = '<div class="card trigger-element"> <div class="card-header"> Element <small class="text-muted" style="display: inline-block"> (Max 10 Elements)</small><button aria-label="Close" class="close" type="button" onclick="removeTriggerElement(this)"><span aria-hidden="true">&times;</span></button> </div><div class="structured-bubble card-block"> <form> <fieldset class="form-group"> <input class="form-control" placeholder="Descriptor"> <small class="text-muted">Optionally provide something to denote this particular message element, added as a comment.</small> </fieldset> <div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Title (Max 45 Chars)" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Subtitle (Max 80 Chars)" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Item URL" type="text"> </div></div><div class="form-group"> <div class="input-group"> <span class="input-group-addon"><input aria-label="Checkbox for following text input." type="checkbox"></span> <input aria-label="Text input with checkbox." class="form-control" placeholder="Image URL" type="text"> </div></div></form> <div class="btn-group"> <button class="btn btn-secondary" type="button" onclick="addButtonBuildDialog(this)">Add Button</button> <button aria-expanded="false" aria-haspopup="true" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" type="button"><span class="sr-only">Toggle Button Dropdown</span></button> <div class="dropdown-menu"> <a class="dropdown-item url-button" onclick="addButtonBuildDialog(this)">URL</a> <a class="dropdown-item postback-button" onclick="addButtonBuildDialog(this)">Postback</a> </div></div></div></div>';

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
    var triggerHTML = '<!-- A chat trigger created by the user -->\r\n            <div class=\"card user-trigger\">\r\n                \r\n                <div class=\"card-header card-primary\" style=\"color: white;\">\r\n                    Trigger\r\n                    <!-- Allow user to delete the trigger -->\r\n                    <button aria-label=\"Close\" class=\"close\" type=\r\n                    \"button\"><span aria-hidden=\"true\" style=\r\n                    \"color: white;\" onclick=\"removeTrigger(this)\">&times;<\/span><\/button>\r\n                <\/div>\r\n                \r\n                <!-- Use a list to split the trigger options -->\r\n                <ul class=\"list-group list-group-flush\">\r\n                    \r\n                    <!-- Trigger options -->\r\n                    <li class=\"list-group-item\">\r\n                        <div class=\"card-block\">\r\n                            \r\n                            <!-- Allow user to describe the trigger -->\r\n                            <fieldset class=\"form-group\">\r\n                                <input class=\"form-control\" placeholder=\"Descriptor\"> <small class=\r\n                                \"text-muted\">Optionally provide something to identify this particular\r\n                                trigger event; this will manifest as function naming and\r\n                                commenting.<\/small>\r\n                            <\/fieldset>\r\n                            \r\n                            <!-- Allow the user to choose the type of trigger -->\r\n                            <h6 class=\"card-subtitle\">Choose the type...<\/h6><br>\r\n                            <div class=\"btn-group btn-block set-trigger-type\" data-toggle=\"buttons\">\r\n                                <label class=\"btn btn-primary-outline trigger-option-text\" style=\r\n                                \"width: 33%;\" onclick=\"switchTriggerType(this)\"><input name=\"trigger-options\" type=\"radio\">Text\r\n                                Contains<\/label>\r\n                                <label class=\"btn btn-primary-outline trigger-option-person\" style=\r\n                                \"width: 33%;\" onclick=\"switchTriggerType(this)\"><input name=\"trigger-options\" type=\"radio\">Specific\r\n                                Person<\/label>\r\n                                <label class=\"btn btn-primary-outline trigger-option-postback\" style=\r\n                                \"width: 33%;\" onclick=\"switchTriggerType(this)\"><input name=\"trigger-options\" type=\r\n                                \"radio\">Postback<\/label>\r\n                            <\/div>\r\n                            \r\n                            <!-- Empty div populated upon selection of trigger type -->\r\n                            <div class=\"trigger-options\">\r\n                            <\/div>\r\n                            \r\n                        <\/div>\r\n                    <\/li>\r\n                    \r\n                    <!-- Event options -->\r\n                    <li class=\"list-group-item\">\r\n                        <div class=\"card-block\">\r\n                            \r\n                            <h6 class=\"card-subtitle\">Add response events...<\/h6><br>\r\n                            \r\n                            <!-- Wrap it in an accordion for ease of access -->\r\n                            <div id=\"trigger-accordion-' + eventCount + '\" role=\"tablist\">\r\n                                \r\n                                <!-- Events -->\r\n                                <div class=\"panel panel-default\">\r\n                                    \r\n                                    <!-- Collapsible tab -->\r\n                                    <div class=\"panel-heading\" role=\"tab\">\r\n                                        <hr \/>\r\n                                        <h6 class=\"card-subtitle text-muted\" style=\"display: inline-block;\">\r\n                                        <a aria-controls=\"trigger-event-' + eventCount + '\" aria-expanded=\"true\" data-parent=\r\n                                        \"#trigger-accordion-' + eventCount + '\" data-toggle=\"collapse\" href=\r\n                                        \"#trigger-event-' + eventCount + '\">Event<\/a><\/h6>\r\n                                        <!-- Allow user to remove the event -->\r\n                                        <button aria-label=\"Close\" class=\r\n                                        \"close pull-xs-right\" type=\"button\" onclick=\"removeEvent(this)\"><span aria-hidden=\r\n                                        \"true\">&times;<\/span><\/button>\r\n                                        <hr \/>\r\n                                    <\/div>\r\n                                    \r\n                                    <!-- Collapsible tab dialogue content. -->\r\n                                    <div class=\"panel-collapse collapse\" id=\"trigger-event-' + eventCount + '\" role=\r\n                                \"tabpanel\">\r\n                                        <!-- Allow user to run code prior to element construction -->\r\n                                        <label for=\"trigger-precode\">Precode:<\/label>\r\n                                        <div class=\"checkbox-inline pull-xs-right\">\r\n                                            <label><input type=\"checkbox\">Include<\/label>\r\n                                        <\/div>\r\n                                        <textarea class=\"form-control m-b-1\" id=\"comment\" rows=\"4\" placeholder=\"Here you can set up local variables (potentially using external API calls) to reference using parentheses in scope in the following fields.\"><\/textarea>\r\n\r\n                                        <!-- Allow user to select the type of content -->\r\n                                        <ul class=\"nav nav-tabs m-b-1\" role=\"tablist\">\r\n\r\n                                            <!-- Plain text response -->\r\n                                            <li class=\"nav-item\">\r\n                                                <a class=\"nav-link plain-text active\" data-toggle=\"tab\" href=\"#trigger-text-' + eventCount + '\"\r\n                                                role=\"tab\">Plain Text<\/a>\r\n                                            <\/li>\r\n\r\n                                            <!-- Structured content bubble response -->\r\n                                            <li class=\"nav-item\">\r\n                                                <a class=\"nav-link structured-content\" data-toggle=\"tab\" href=\"#trigger-structured-' + eventCount + '\"\r\n                                                role=\"tab\">Structured Content<\/a>\r\n                                            <\/li>\r\n                                        <\/ul>\r\n\r\n                                        <div class=\"tab-content\">\r\n\r\n                                            <!-- Plain text response -->\r\n                                            <div class=\"tab-pane fade in active\" id=\"trigger-text-' + eventCount + '\" role=\r\n                                            \"tabpanel\">\r\n                                                <form>\r\n                                                    <div class=\"form-group\">\r\n                                                        <input class=\"form-control\" id=\"trigger-plaintext\" placeholder=\r\n                                                        \"Reply with a plain text message.\" type=\"text\">\r\n                                                    <\/div>\r\n                                                <\/form>\r\n                                            <\/div>\r\n\r\n                                            <!-- Structured content bubble response -->\r\n                                            <div class=\"tab-pane fade\" id=\"trigger-structured-' + eventCount + '\" role=\"tabpanel\">\r\n\r\n                                                <!-- Section the element for clarity -->\r\n                                                <div class=\"card trigger-element\">\r\n                                                    <div class=\"card-header\">\r\n                                                        Element \r\n                                                        <small class=\"text-muted\" style=\"display: inline-block\"> (Max 10 Elements)<\/small>\r\n                                                        <!-- Allow user to remove the element -->\r\n                                                        <button aria-label=\"Close\" class=\"close\" type=\r\n                                                        \"button\" onclick=\"removeTriggerElement(this)\"><span aria-hidden=\"true\">&times;<\/span><\/button>\r\n                                                    <\/div>\r\n\r\n                                                    <div class=\"structured-bubble card-block\">\r\n\r\n                                                        <form>\r\n\r\n                                                            <!-- Allow user to describe the message element they are building -->\r\n                                                            <fieldset class=\"form-group\">\r\n                                                                <input class=\"form-control\" placeholder=\"Descriptor\">\r\n                                                                <small class=\"text-muted\">Optionally provide something to denote\r\n                                                                this particular message element, added as a comment.<\/small>\r\n                                                            <\/fieldset>\r\n\r\n                                                            <!-- Title of the bubble -->\r\n                                                            <div class=\"form-group\">\r\n                                                                <div class=\"input-group\">\r\n                                                                    <span class=\"input-group-addon\"><input aria-label=\r\n                                                                    \"Checkbox for following text input.\" type=\"checkbox\"><\/span>\r\n                                                                    <input aria-label=\"Text input with checkbox.\" class=\"form-control\"\r\n                                                                    placeholder=\"Title (Max 45 Chars)\" type=\"text\">\r\n                                                                <\/div>\r\n                                                            <\/div>\r\n\r\n                                                            <!-- Subtitle of the bubble -->\r\n                                                            <div class=\"form-group\">\r\n                                                                <div class=\"input-group\">\r\n                                                                    <span class=\"input-group-addon\"><input aria-label=\r\n                                                                    \"Checkbox for following text input.\" type=\"checkbox\"><\/span>\r\n                                                                    <input aria-label=\"Text input with checkbox.\" class=\"form-control\"\r\n                                                                    placeholder=\"Subtitle (Max 80 Chars)\" type=\"text\">\r\n                                                                <\/div>\r\n                                                            <\/div>\r\n\r\n                                                            <!-- URL of the bubble -->\r\n                                                            <div class=\"form-group\">\r\n                                                                <div class=\"input-group\">\r\n                                                                    <span class=\"input-group-addon\"><input aria-label=\r\n                                                                    \"Checkbox for following text input.\" type=\"checkbox\"><\/span>\r\n                                                                    <input aria-label=\"Text input with checkbox.\" class=\"form-control\"\r\n                                                                    placeholder=\"Item URL\" type=\"text\">\r\n                                                                <\/div>\r\n                                                            <\/div>\r\n\r\n                                                            <!-- Image of the bubble -->\r\n                                                            <div class=\"form-group\">\r\n                                                                <div class=\"input-group\">\r\n                                                                    <span class=\"input-group-addon\"><input aria-label=\r\n                                                                    \"Checkbox for following text input.\" type=\"checkbox\"><\/span>\r\n                                                                    <input aria-label=\"Text input with checkbox.\" class=\"form-control\"\r\n                                                                    placeholder=\"Image URL\" type=\"text\">\r\n                                                                <\/div>\r\n                                                            <\/div>\r\n\r\n                                                        <\/form>\r\n\r\n                                                        <!-- Allow the user to add multiple buttons -->\r\n                                                        <div class=\"btn-group\">\r\n                                                            <button class=\"btn btn-secondary\" type=\"button\" onclick=\"addButtonBuildDialog(this)\">Add Button<\/button>\r\n                                                            <button aria-expanded=\"false\" aria-haspopup=\"true\" class=\r\n                                                            \"btn btn-secondary dropdown-toggle\" data-toggle=\"dropdown\" type=\r\n                                                            \"button\"><span class=\"sr-only\">Toggle Button Dropdown<\/span><\/button>\r\n                                                            <div class=\"dropdown-menu\">\r\n                                                                <!-- Add option for URL button -->\r\n                                                                <a class=\"dropdown-item url-button\" onclick=\"addButtonBuildDialog(this)\">URL<\/a>\r\n                                                                <!-- Add option for postback button -->\r\n                                                                <a class=\"dropdown-item postback-button\" onclick=\"addButtonBuildDialog(this)\">Postback<\/a>\r\n                                                            <\/div>\r\n                                                        <\/div>\r\n\r\n                                                    <\/div>\r\n                                                <\/div>\r\n\r\n                                                <!-- Allow the user to create a carousel of elements -->\r\n                                                <button class=\"btn btn-primary m-b-1\" type=\"button\" onclick=\"addEventElement(this)\">Add\r\n                                                Element<\/button>\r\n\r\n                                            <\/div>\r\n\r\n                                            <hr \/>\r\n\r\n                                        <\/div>\r\n                                    <\/div>\r\n                                <\/div>\r\n                                \r\n                            <\/div>\r\n                            \r\n                            <!-- Allow the user to add more events -->\r\n                            <button class=\"btn btn-primary m-b-1 m-t-1\" type=\"button\" onclick=\"addEvent(this)\">\r\n                            Add Event<\/button>\r\n                            \r\n                        <\/div>\r\n                    <\/li>\r\n                <\/ul>\r\n            <\/div>\r\n            \r\n            <br \/>';
    
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