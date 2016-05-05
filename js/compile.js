/* Final compile script. */
            
/* Methods have been modulated for code-clarity. */

/*
 * Scrape user choices from the page -
 * preferable to a million listeners.
 * 
 * Produce a functioning chat-bot based
 * on this criteria as a javascript file
 * for hosting with NodeJS.
 */
function buildFile() {

    /* User notification. */

    // Inform the user that this may take a while.
    displayAlert();

    // Ensure that all necessary fields have been filled.
    // if(!checkErrors()) break;

    /* Build the file. */

    let file = getAttributionText();

    file += getSetupText();

    file += getBotCreationText();

    file += getUserGlobalsText();

    file += getEventHandlers();

    file += getUtilityFunctionText();

    file += getStartBotListeningText();

    /* Save the file. */

    // Get the chatbot's name, checking for redundancy.
    var cbName = $('#chatbot-name').val();
    if (!cbName) cbName = "my-chatbot";

    // Push the file to the user's browser.
    saveFile(file, cbName + '.js');

}

/*
 * Display an alert to the user
 * informing them generation is
 * under way, and optionally provide
 * them with their welcome URL.
 */
function displayAlert() {

    // Hide the CURL string.
    $('div#welcome-string').css('visibility','hidden');
    
    // If the user has selected a welcome message...
    if($('#welcome-toggle').is(':checked')) {
        
        // Get the page ID.
        var pageID = $('#welcome-pageid').val();
        
        // Get the user's page access key.
        var key = $('#config-access').val();
        
        // Get the welcome text.
        var welcomeText = $('#welcome-plaintext').val();
        
        // Create the necessary CURL string...
        var curlString = "curl -X POST -H \"Content-Type: application/json\" -d \'{ \"setting_type\":\"call_to_actions\", \"thread_state\":\"new_thread\", \"call_to_actions\":[ { \"message\":{ \"text\":\"" + welcomeText + "\" } } ] }\' \"https://graph.facebook.com/v2.6/" + pageID + "/thread_settings?access_token=" + key + "\"";
        
        // Add the string to the modal.
        $('#welcome-post-request').text(curlString);
        
        // Show the CURL string.
        $('div#welcome-string').css('visibility','initial');
        
    }
    
    // Show the modal.
    $('#compile-info').modal('show');

}

/* File-building methods. */

/*
 * Return text attributive to
 * myself and plugin authors.
 */
function getAttributionText() {     
    return "/* Code generated at http://www.messengerbot.ml/ */\n";
}

/*
 * Return text that describes
 * inclusions and file properties.
 */
function getSetupText() {

    return "\n/* Configuration and set-up. */\n\n// Enforce stricter Javascript typing.\n'use strict'\n\n// Necessary inclusions.\nconst http = require('http');\nconst Bot = require('messenger-bot');";

}

/*
 * Return text necessary to
 * create the bot.
 */
function getBotCreationText() {

    // Get the user's page access key.
    var key = $('#config-access').val();

    // Get the user's secret phrase.
    var phrase = $('#config-phrase').val();

    return "\n\n// Instantiate the bot with security information.\n"
        + "let bot = new Bot({\n\ttoken: '"
        + key
        + "',\n\tverify: '"
        + phrase
        + "'\n});";

}

/*
 * Return user-defined global code.
 */
function getUserGlobalsText() {

    // Get the user's global precode.
    var userGlobalPrecode = $('#config-globals').val();

    return "\n\n/* User-defined inclusions and functions. */\n\n" + userGlobalPrecode + "\n\n";

}

/*
 * Return chatbot error handler.
 */
function getChatbotErrorFunction() {

    return "/* Chat-bot event subroutines. */\n\n/*\n * Log functional errors to console,\n * visible if locally hosted.\n */\nbot.on('error', (err) => {\n\tconsole.log(err.message)\n})\n\n";

}

/*
 * This monstrous function constructs every
 * logical catch and response for each type
 * of trigger. It's been commented to all hell
 * to make up for its size; as an improvement
 * I would use a templating library.
 */
function getEventHandlers() {

    /* Generic text triggers. */

    // This is necessary for the message handler.
    var onMessageOpeningJS = "\/*\r\n * Register listening for message.\r\n * This is the main branching-point\r\n * for the webhook.\r\n *\/\r\nbot.on(\'message\', (payload, reply) => {\r\n    \r\n\t\/* Retrieve user profile information. *\/\r\n    \r\n\tbot.getProfile(payload.sender.id, (err, profile) => {\r\n\r\n        \/\/ If an error was encountered, break.\r\n        if (err) throw err;\r\n        \r\n        \/\/ Catch failure to fire.\r\n        var notCaught = true;\r\n\r\n        \/\/ Otherwise, set values returned from siphoning.\r\n        var first_name = profile.first_name;\r\n        var last_name = profile.last_name;\r\n\r\n        \/\/ Store user message.\r\n        var text = payload.message.text;\r\n\r\n        \/\/ Construct response to user.\r\n        var response = {};\r\n        \r\n        \/* Response elements. *\/\r\n        \r\n        var elements = [];\r\n        var buttons;\r\n\r\n        \/* Else-if tree structure checks for each trigger. *\/\r\n\r\n        \/\/ If user-based triggers fire, stop checking.\r\n        if(handleUserTriggers(payload, reply, first_name, last_name)) { return; };\r\n\r";

    // This is user-defined based on generic text-triggers.
    var onMessageMiddleJS = "";

    // This is necessary for the message handler.
    var onMessageClosingJS = "\n\t});\r\n\r\n});\n\n";

    /* Postback triggers. */

    // This is necessary for the postback handler.
    var onPostbackOpeningJS = "\/*\r\n * Register listening for postbacks.\r\n *\/\r\nbot.on(\'postback\', (payload, reply) => {\r\n\r\n\t\/* Retrieve user profile information. *\/\r\n\r\n\tbot.getProfile(payload.sender.id, (err, profile) => {\r\n\r\n\t\t\/\/ If an error was encountered, break.\r\n\t\tif (err) throw err;\r\n\r\n\t\t\/\/ Otherwise, set values returned from siphoning.\r\n\t\tvar first_name = profile.first_name;\r\n\t\tvar last_name = profile.last_name;\r\n\n        // Store user payload.\n        var postback = payload.postback.payload;        \r\n\n        \/\/ Construct response to user.\r\n        var response = {};\r\n        \r\n        \/* Build response. *\/\r\n        \r\n        var elements = [];\r\n        var buttons;\r\n\r\n        \/* Else-if tree structure checks for each trigger. *\/\r\n\n";

    // This is user defined based on postback triggers.
    var onPostbackMiddleJS = "";

    // This is necessary for the postback handler.
    var onPostbackClosingJS = "\r\n\t});\r\n\r\n});\n\n";

    /* User triggers. */

    // This is necessary for the user handler.
    var onUserOpeningJS = "/*\n * Split functionality into handling\n * username-based triggers.\n */\nfunction handleUserTriggers(payload, reply, first_name, last_name) {\n\n\t// Store user message.\n\tvar text = payload.message.text;\n\n\t// Construct response to user.\n\tvar response = {};\n\n\t/* Build elements. */\n\n\tvar elements = [];\n\tvar buttons;\n\n";

    // This is user defined based on user triggers.
    var onUserMiddleJS = "";

    // This is neccessary for the user handler.
    var onUserClosingJS = "\t// Return that no triggers were fired.\n\treturn false;\n\n}\n";

    /* Start appending nested user choices. */

    // For every trigger.
    $('.user-trigger ').each(function(index) {

        // Get the type of trigger.
        var triggerParent = $(this);
        var triggerTypeRadio = $(triggerParent).find('.list-group .set-trigger-type .active')[0];

        // Get the user description of the trigger. 
        var userDesc = $(triggerParent).find('input.form-control').first().val().trim();

        /* Set-up catches! */

        // Maintain logical correctness.
        // TODO: Correct this!
        var logicInsert = "";
        // if(index > 0) logicInsert = "else ";

        // If the trigger is a text-based one...
        if($(triggerTypeRadio).hasClass('trigger-option-text')) {

            if(userDesc) {
                // Add description.
                onMessageMiddleJS += "\t/* " + userDesc + " */";  
            }
            
            // Retrieve whether the text is a catch-all.
            var isCatchAll = $($(triggerParent).find('input:checkbox')[1]).is(':checked');
            
            if(isCatchAll) {
                
                onMessageMiddleJS += "\n\t\t"
                    + "if(true) {\n\n";
                
            }
            else {

            // Retrieve whether text inclusion is strict.
            var isStrict = $(triggerParent).find('input:checkbox').first().is(':checked');

            // Retrieve text inclusion.
            var textToMatch = formatCode($($(triggerParent).find('input.form-control')[1]).val());

            // Use utility method to check contains.
            onMessageMiddleJS += "\n\t"
                + logicInsert
                + "if(textContains(text, (\""
                + textToMatch
                + "\"), "
                + isStrict
                + ")) {\n\n";
                
            }

        }
        // If the trigger is a user-based one...
        else if($(triggerTypeRadio).hasClass('trigger-option-person')) {

            if(userDesc) {
                // Add description.
                onUserMiddleJS += "\t/* " + userDesc + " */";  
            }

            // Store first and last names.
            var firstname, lastname;

            // If first name is selected...
            if($($(triggerParent).find('.trigger-options input:checkbox')[0])
               .is(':checked')) {
                firstname = $($(triggerParent).find('.trigger-options input:text')[0])
                    .val().trim();
            }
            // If second name is selected...
            if($($(triggerParent).find('.trigger-options input:checkbox')[1])
               .is(':checked')) {
                lastname = $($(triggerParent).find('.trigger-options input:text')[1])
                    .val().trim();
            }

            if(firstname && lastname) {
                onUserMiddleJS += "\n\t" + logicInsert + "if(first_name == '" +
                    firstname + "' && last_name == '" + lastname + "') {\n\n";
            }
            else if(firstname) {
                onUserMiddleJS += "\n\t" + logicInsert + "if(first_name == '" +
                    firstname + "') {\n\n";
            }
            else if(lastname) {
                onUserMiddleJS += "\n\t" + logicInsert + "if(last_name == '" + lastname + "') {\n\n";
            }

        }
        // If the trigger is a postback-based one...
        else if($(triggerTypeRadio).hasClass('trigger-option-postback')) {

            if(userDesc) {
                // Add description.
                onPostbackMiddleJS += "\t/* " + userDesc + " */";  
            }
            
            // Retrieve whether the text is a catch-all.
            var isCatchAll = $($(triggerParent).find('input:checkbox')[0]).is(':checked');
            
            if(isCatchAll) {
                
                onPostbackMiddleJS += "\n\t\t"
                    + "if(true) {\n\n";
                
            }
            else {

                // Retrieve postback id to match.
                var postbackToMatch = formatCode($($(triggerParent).find('input.form-control')[1]).val());

                // Compare the two payload IDs.
                onPostbackMiddleJS += "\n\t\t"
                    + logicInsert
                    + "if(postback == \""
                    + postbackToMatch
                    + "\") {\n\n";
                
            }

        }

        /* Add events within trigger. */

        // Store temporary subset of JavaScript.
        var eventJS = "";

        $(triggerParent).find('div[id*="trigger-event-"]').each(function() {

            // Get the enclosing event dialog.
            var eventParent = $(this);

            // See if precode is to be included.
            let includePrecode = $(eventParent).find('div.checkbox-inline input:checkbox').is(':checked');

            if(includePrecode) {

                // Add the precode.
                eventJS += "\t\n/* User-provided pre-code. */\n\n"
                    + $(eventParent).find('textarea').first().val().trim() + "\n\n";

            }

            // If the event content is plain text...
            if($(eventParent).find('.nav-link.active').first().hasClass('plain-text')) {

                // Get the plain text.
                var plainTextReply = formatCode($(eventParent).find('input:text').first().val().trim());

                // Inject the reply.
                eventJS += "\t\t\treply({ text: \"" + plainTextReply + "\"}, (err, info) => {});\n\n";

            }
            // If the event content is structured...
            else {

                // For every element of the event...
                $(eventParent).find('.card.trigger-element').each(function() {

                    // Get the enclosing element dialog.
                    var elementParent = $(this);

                    // Get the element descriptor.
                    var elementDescriptor = $(elementParent).find('input.form-control')
                        .first().val().trim();

                    // Add description to the event code if it exists.
                    if(elementDescriptor) {
                        eventJS += "\n\t/* " + elementDescriptor + " */\n\n";
                    }

                    // Add button clearance.
                    eventJS += "\t// Format element's buttons if they exist.\n\tbuttons = [];\n\n";

                    // For every button within the element...
                    $(this).find('.add-button').each(function() {

                        // Get the enclosing button dialog.
                        var buttonParent = $(this);

                        // Get the button descriptor.
                        var buttonDescriptor = $(buttonParent).find('input.form-control')
                            .first().val().trim();

                        // Add description to the event code if it exists.
                        if(buttonDescriptor) {
                            eventJS += "\n\t/* " + buttonDescriptor + " */\n";
                        }

                        var type;

                        // If the button is an URL button...
                        if($(buttonParent).find('.btn.active input').first().hasClass('url-button')) {
                            // Set the type.
                            type = "url";
                        }
                        // If the button is a postback button...
                        else {
                            // Set the type.
                            type = "postback";
                        }

                        // Get the two relevant fields.
                        var title = formatCode($($(buttonParent).find('.button-type-controls input')[0]).val().trim());
                        var uri = formatCode($($(buttonParent).find('.button-type-controls input')[1]).val().trim());
                        
                        /* Find out whether the buttons need repeated and add enclosing structure. */
                
                        var doRepeatButton = $(buttonParent).find('input:checkbox').first().is(':checked');

                        // If the button is to be repeated, retrieve the number of times.
                        if(doRepeatButton) {

                            // Make sure the value is formatted.
                            var repeatTimes = $(buttonParent).find('.button-type-controls .form-group input.form-control').val().trim();

                            eventJS += "\tfor(var i = 0; i < " + formatCode(repeatTimes) + "; i++) {\n\n"

                        }

                        // Push the buttons to the storage object.
                        eventJS += '\tbuttons.push(buildButton("' + type + '", "' + title + '", "' + uri + '"));\n';
                        
                        // Remember to close the code-block.
                        if(doRepeatButton) {

                            eventJS += "\n\t}\n";

                        }

                    });

                    /* Retrieve the element's fields. */

                    // Declare all possible fields.
                    /*
                     * I learned something!
                     * http://davidshariff.com/blog/chaining-variable-assignments-in-javascript-words-of-caution/
                     */
                    var title = "", subtitle = "", itemurl = "", imageurl = "";

                    // If the title is checked, retrieve it...
                    if($($(elementParent).find('input:checkbox')[0]).is(':checked')) {
                        title = formatCode($($(elementParent).find('input.form-control')[1]).val().trim());
                    }

                    // If the subtitle is checked, retrieve it...
                    if($($(elementParent).find('input:checkbox')[1]).is(':checked')) {
                        subtitle = formatCode($($(elementParent).find('input.form-control')[2]).val().trim());
                    }

                    // If the item url is checked, retrieve it...
                    if($($(elementParent).find('input:checkbox')[2]).is(':checked')) {
                        itemurl = formatCode($($(elementParent).find('input.form-control')[3]).val().trim());
                    }

                    // If the image url is checked, retrieve it...
                    if($($(elementParent).find('input:checkbox')[3]).is(':checked')) {
                        imageurl = formatCode($($(elementParent).find('input.form-control')[4]).val().trim());
                    }

                    // Build the greater element.
                    eventJS += "\n\t// Format element.\n\n\telements.push(buildElement(\n\t\t\""
                        + title
                        + "\",\n\t\t\""
                        + subtitle
                        + "\",\n\t\t\"" 
                        + itemurl
                        + "\",\n\t\t\""
                        + imageurl
                        + "\",\n\t\tbuttons\n\t));\n\n";

                });

                // Build the greater template.
                eventJS += "\t\/* Build the greater template and send it. *\/\r\n\t\r\n\treply(buildStructuredTemplate(elements), (err, info) => {\r\n\t\t\/\/ If an error was encountered, break.\r\n\t\tif (err) throw err;\r\n\t});\n\n";

            }

        });

        // Close the trigger block.
        if($(triggerTypeRadio).hasClass('trigger-option-person')) {
            eventJS += "\n\t//Log that user-based trigger has fired.\n\treturn true;\n\n\t}\n\n";
        }
        else if($(triggerTypeRadio).hasClass('trigger-option-text')) {
            eventJS += "\n\n\t\t\t// Log that at least one event has triggered.\n\t\t\tnotCaught = false;\n\n\t}\n\n";
        }
        else eventJS += "\n\t\t}\n\n";

        // Add the new event code to the right section.
        if($(triggerTypeRadio).hasClass('trigger-option-text')) {
            onMessageMiddleJS += eventJS;
        }
        else if($(triggerTypeRadio).hasClass('trigger-option-person')) {
            onUserMiddleJS += eventJS;
        }
        else if($(triggerTypeRadio).hasClass('trigger-option-postback')) {
            onPostbackMiddleJS += eventJS;
        }

    });

    /* Add the default/fallback if it's included. */

    if($('#error-toggle').is(':checked')) {

        // Store temporary subset of JavaScript.
        var errorJS = "\n\t\tif(notcaught) {\n\n";

        // Get the enclosing event dialog.
        var eventParent = $('#error-trigger').first();

        // See if precode is to be included.
        let includePrecode = $(eventParent).find('div.checkbox-inline input:checkbox').is(':checked');

        if(includePrecode) {

            // Add the precode.
            errorJS += "\t\n/* User-provided pre-code. */\n\n"
                + $(eventParent).find('textarea').first().val().trim() + "\n\n";

        }

        // If the event content is plain text...
        if($(eventParent).find('.nav-link.active').first().hasClass('plain-text')) {

            // Get the plain text.
            var plainTextReply = formatCode($(eventParent).find('input:text').first().val().trim());

            // Inject the reply.
            errorJS += "\t\t\treply({ text: \"" + plainTextReply + "\"}, (err, info) => {});\n\n\t\t}\n";
            
            // Add the error catch.
            onMessageMiddleJS += errorJS;

        }
        // If the event content is structured...
        else {

            // Get the enclosing element dialog.
            var elementParent = $(eventParent).find('.tab-content .tab-pane.active').first();

            // Add button clearance.
            errorJS += "\t// Format element's buttons if they exist.\n\tbuttons = [];\n\n";

            // For every button within the element...
            $(elementParent).find('.add-button').each(function() {

                // Get the enclosing button dialog.
                var buttonParent = $(this);

                // Get the button descriptor.
                var buttonDescriptor = $(buttonParent).find('input.form-control')
                    .first().val().trim();

                // Add description to the event code if it exists.
                if(buttonDescriptor) {
                    errorJS += "\n\t/* " + buttonDescriptor + " */\n";
                }

                var type;

                // If the button is an URL button...
                if($(buttonParent).find('.btn.active input').first().hasClass('url-button')) {
                    // Set the type.
                    type = "url";
                }
                // If the button is a postback button...
                else {
                    // Set the type.
                    type = "postback";
                }

                // Get the two relevant fields.
                var title = formatCode($($(buttonParent).find('.button-type-controls input')[0]).val().trim());
                var uri = formatCode($($(buttonParent).find('.button-type-controls input')[1]).val().trim());
                
                // Push the buttons to the storage object.
                errorJS += '\t\tbuttons.push(buildButton("' + type + '", "' + title + '", "' + uri + '"));\n';

            });

            /* Retrieve the element's fields. */

            // Declare all possible fields.
            /*
             * I learned something!
             * http://davidshariff.com/blog/chaining-variable-assignments-in-javascript-words-of-caution/
             */
            var title = "", subtitle = "", itemurl = "", imageurl = "";

            // If the title is checked, retrieve it...
            if($($(elementParent).find('input:checkbox')[0]).is(':checked')) {
                title = formatCode($($(elementParent).find('input.form-control')[0]).val().trim());
            }

            // If the subtitle is checked, retrieve it...
            if($($(elementParent).find('input:checkbox')[1]).is(':checked')) {
                subtitle = formatCode($($(elementParent).find('input.form-control')[1]).val().trim());
            }

            // If the item url is checked, retrieve it...
            if($($(elementParent).find('input:checkbox')[2]).is(':checked')) {
                itemurl = formatCode($($(elementParent).find('input.form-control')[2]).val().trim());
            }

            // If the image url is checked, retrieve it...
            if($($(elementParent).find('input:checkbox')[3]).is(':checked')) {
                imageurl = formatCode($($(elementParent).find('input.form-control')[3]).val().trim());
            }

            // Build the greater element.
            errorJS += "\t// Format element.\n\n\telements.push(buildElement(\n\t\t\""
                + title
                + "\",\n\t\t\""
                + subtitle
                + "\",\n\t\t\"" 
                + itemurl
                + "\",\n\t\t\""
                + imageurl
                + "\",\n\t\tbuttons\n\t));\n\n";

            // Build the greater template.
            errorJS += "\t\/* Build the greater template and send it. *\/\r\n\t\r\n\treply(buildStructuredTemplate(elements), (err, info) => {\r\n\t\t\/\/ If an error was encountered, break.\r\n\t\tif (err) throw err;\r\n\t});\n\n\t}\n\n";

            // Add the error catch.
            onMessageMiddleJS += errorJS;

        }

    }

    // Return all app handlers.
    return onMessageOpeningJS + onMessageMiddleJS + onMessageClosingJS
        + onPostbackOpeningJS + onPostbackMiddleJS + onPostbackClosingJS
        + onUserOpeningJS + onUserMiddleJS + onUserClosingJS;

}

/*
 * Get extra functions used by most of the code.
 */
function getUtilityFunctionText() {

    return "\n\/*\r\n * Attach meta elements to JSON object to\r\n * format it cohesive to the API.\r\n *\r\n * @param elements All bubble carousel elements.\r\n *\/\r\nfunction buildStructuredTemplate(elements) {\r\n    \r\n    var message = {\r\n        \"attachment\": {\r\n            \"type\": \"template\",\r\n            \"payload\": {\r\n                \"template_type\":\"generic\",\r\n                \"elements\": elements\r\n            }\r\n        }\r\n    }\r\n\r\n    return message;\r\n    \r\n}\r\n\r\n\/*\r\n * Return a part of a JSON message\r\n * object formatted to the messenger\r\n * send API.\r\n *\r\n * @param title     The title of the bubble.\r\n * @param subtitle  The subtitle of the bubble.\r\n * @param itemurl   The URL of the bubble.\r\n * @param imageurl  The image of the bubble.\r\n * @param buttons   The JSON button array for the bubble.\r\n *\/\r\nfunction buildElement(title, subtitle, itemurl, imageurl, buttons) {\r\n    \r\n    \/\/ Build the element.\r\n    var element = {};\r\n    \r\n    \/\/ Set the provided fields, checking for inclusion.\r\n    if (title) element[\"title\"] = title;\r\n    if (subtitle) element[\"subtitle\"] = subtitle;\r\n    if (itemurl) element[\"item_url\"] = itemurl;\r\n    if (imageurl) element[\"image_url\"] = imageurl;\r\n    if (buttons) element[\"buttons\"] = buttons;\r\n    \r\n    return element;\r\n    \r\n}\r\n\r\n\/*\r\n * Return a part of a JSON message\r\n * object formatted to the messenger\r\n * send API.\r\n *\r\n * @param title The button identifier.\r\n * @param uri   URL or payload identifier.\r\n *\/\r\nfunction buildButton(type, title, uri) {\r\n    \r\n    \/\/ Build button.\r\n    var button = {};\r\n    \r\n    if(type == \'url\') {\r\n        button[\"type\"] = \"web_url\";\r\n        button[\"title\"] = title;\r\n        button[\"url\"] = uri;\r\n    }\r\n    else if(type == \'postback\') {\r\n        button[\"type\"] = \"postback\";\r\n        button[\"title\"] = title;\r\n        button[\"payload\"] = uri;\r\n    }\r\n    \r\n    return button;\r\n    \r\n}\r\n\r\n\/*\r\n * Check is a message is contained\r\n * within a check string, with\r\n * optional leniency.\r\n *\r\n * @param message   The user message.\r\n * @param check     The check string.\r\n * @param strict    Determine leniency.\r\n *\/\r\nfunction textContains(message, check, strict) {\r\n    \r\n    \/\/ If strict checking enabled...\r\n    if(strict) {\r\n        return message.includes(check);\r\n    }\r\n    \/\/ Otherwise be a bit more lenient.\r\n    else {\r\n        \r\n        \/\/ Make both messages the same capitalisation.\r\n        message = message.toLowerCase();\r\n        check = check.toLowerCase();\r\n        \r\n        \/\/ If there is just one word...\r\n        if(!check.includes(\" \")) {\r\n            return message == check ? true : false;\r\n        }\r\n        \r\n        \/\/ Split the check into substrings.\r\n        check = check.split(\" \");\r\n        \r\n        \/\/ Ensure all elements are appear at least once.\r\n        var length = check.length;\r\n        var matched = 0;\r\n        while(length--) {\r\n           if (message.indexOf(check[length])!=-1) {\r\n               matched++;\r\n           }\r\n        }\r\n        return matched == check.length ? true : false;\r\n        \r\n    }\r\n    \r\n}\r\n\n";

}

/*
 * Return text necessary to
 * create the bot.
 */
function getStartBotListeningText() {

    // Get user defined port.
    var port = $('#config-port').val();

    // Check for redundancy.
    port = port.replace("-","").replace(".","");
    if(!port) port = "3000";

    return "\n// Create the bot at the correct port!\nhttp.createServer(bot.middleware()).listen("
        + port + ");";

}

/*
 * Push an event to the browser
 * to start automatic download of
 * the generated file.
 *
 * @param data      The information to save.
 * @param fileName  The name of the file.
 */
function saveFile(data, fileName) {

    // Create an invisible link to simulate a click on.
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    // Create a new file.
    var blob = new Blob([data], {type:"text/plain"}),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;

    // Push it to the user.
    a.click();

    // Remove it in post.
    window.URL.revokeObjectURL(url);

}

/*
 * Replace parenthesised code so
 * it doesn't break the output file.
 *
 * @param code  The text string to escape.
 */
function formatCode(code) {
    return code.replace("{","\" + ").replace("}"," + \"");
}