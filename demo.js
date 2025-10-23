$(document).ready(function () { // Ensure DOM is fully loaded before running JS code. DOM Readiness: when webpage loads, the browsser first parses(analyzing and converting a program into an internal format that a runtime environment can actually run) the HTML to create DOM tree. JS code that attempts to interact with or modify elements in the DOM before it's fully constructed will encounter errors.
    // The Document Object Model (DOM) in JavaScript is a programming interface for web documents. It represents the structure of an HTML or XML document as a tree of objects, allowing JavaScript to interact with and manipulate the content, structure, and style of a web page. 
    // Create array that stores multiple data after user submit
    let userData = [];  // let : variable that can be reassigned later; mutable. if use LET here(array variable - []), it'll clear or replace entire list.
    let editIndex = null; // const : variable that CANNOT be reassigned later; immutable. if use CONST here(array variable - []), it is recommended to use CONST if wanting to store growing list of users.
    // !! KEEP IN MIND !!
    // 'const' : If want to mutate(ONLY THESE ARE POSSIBLE: push/pop/splice) but not reassign the variable itself
    // 'let' : If want to reassign the variable itself (e.g. replace the entire array/object with a new one)
    // 'var' : Avoid using 'var' in modern JS due to its function scope and hoisting behavior, which can lead to unexpected results. Prefer 'let' and 'const' for block-scoped variables. (JS FOR OLDER BROWSERS; old legacy JS code, not recommended for modern code)
    
    // Handles form submission
    $('#userForm').submit(function (event) { // .submit() vs .click(): explained in line 127
        event.preventDefault(); // Prevent page refresh

        // Read Input Values. 
        // Usually we use 'const' for variables that won't be reassigned later(in this case); immutable
        const name = $('#nameValue').val();
        const district = $('#districtValue').val();
        const poscode = $('#posCodeValue').val();
        const address = $('#addressValue').val();
        const employeeId = $('#employeeIdValue').val();

        // Validate Fields; check if any field is empty
        if (!name || !district || !poscode || !address || !employeeId) {
            alert('Please fill in all fields.');
            return;
        }

        // Create User Object; Store Data in Object
        const user = {name, district, poscode, address, employeeId}; // data type changing?

        if (editIndex === null) { // why 3 equals ? explained in line 149
            // Add New Data; data to Array
            userData.push(user);
        } else {
            // Update Existing Data
            userData[editIndex] = user;
            editIndex = null; // Reset edit index
            $('#userForm button[type="submit"]').text('Submit'); // Change button text back to Submit
        }

        // Clear Form Fields
        $('#userForm')[0].reset();

        // Call displayData() function to Display/Refresh all submitted data in table
        displayData();

    });

    // Function to display all submitted data
    function displayData() {
        let output = ''; // declare empty string variable to hold HTML content
        if (userData.length === 0) { // keep in mind, triple equals (===) checks for both value and type equality
            output = '<p>No data submitted yet.</p>';
        } else {
            // output = output + values
            // backticks (`) — they let you write multi-line strings and embed variables easily later using ${...}.
            output += ` 
                <!-- TABLE OF DATA INPUTS -->
                <div class="row-mt-4">
                    <div class="col-md-6 offset-md-3">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>District</th>
                                    <th>Pos Code</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        <tbody>
                            
                `;
            // userData.forEach(...) : explained in line 193
            userData.forEach((user, index) => {
                output += `
                    <tr>
                        <td>${user.employeeId}</td>
                        <td>${user.name}</td>
                        <td>${user.district}</td>
                        <td>${user.poscode}</td>
                        <td>${user.address}</td>
                        <td>
                            <button class="btn btn-sm btn-primary edit-button" data-index="${index}">
                            <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-danger delete-button" data-index="${index}">
                            <i class="fas fa-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                `;
            });

            output += `</tbody></table></div></div>`;
        }
        $('#output').html(output);
    }

    // Event delegation for Edit and Delete buttons
    // for, ' $('#output').on('click', '.edit-button', function () ' { :
        // listens to click events from elements matching '.edit-button' within #output container
        // What it does: Attaches a click event handler using event delegation.
        // Why delegation? Because .edit-button elements are added dynamically (new table rows), binding to the container ensures clicks on newly created buttons are caught. If you used $('.edit-button').click(...) that binding would miss future elements added later.
        // below code function explained more in line 241
        $('#output').on('click', '.edit-button', function () {
        const index = $(this).data('index');
        const user = userData[index];

        // Populate form fields with existing data
        // piece of code explained more in line 248
        $('#nameValue').val(user.name);
        $('#districtValue').val(user.district);
        $('#posCodeValue').val(user.poscode);
        $('#addressValue').val(user.address);
        $('#employeeIdValue').val(user.employeeId);

        // Set edit mode
        editIndex = index;
        $('#userForm button[type="submit"]').text('Update'); // Change button text to Update
    });

    $('#output').on('click', '.delete-button', function () {
        const index = $(this).data('index');
        
        if (confirm('Are you sure you want to delete this data?')) {
            userData.splice(index, 1); // Remove data from array; splice() explained in line 207
            displayData(); // Refresh table
        }   
    });
});

// !!! KEEP IN MIND !!!

// DIFFERENCES between .submit() and .click() in jQuery :
    // Target Element: .submit() targets a <form> element, while .click() targets any interactive element.
    // Event Fired: .submit() fires the submit event, while .click() fires the click event.
    // Default Action: .submit() directly initiates form submission, while .click() on a submit button can indirectly lead to form submission.
    // Scope: .submit() is form-specific, whereas .click() is general-purpose for simulating user interaction.
    // ** .submit() FUNCTION :
        // Purpose: The .submit() function is specifically designed to programmatically trigger the submission of an HTML form. It is typically invoked on a <form> element.
        // Event Triggered: It triggers the submit event on the form, allowing any attached onsubmit event listeners to execute.
        // Behavior: When .submit() is called, the browser attempts to submit the form data to the server, usually leading to a page navigation or an AJAX request, depending on the form's action and method attributes, and any JavaScript handling.
        // Invocation: Can be invoked on the FORM ELEMENT itself, e.g., document.getElementById('myForm').submit().
    // ** .click() FUNCTION :
        // Purpose: The .click() function simulates a click event on any HTML element. While it can be used on a submit button, its scope is much broader.
        // Event Triggered: It triggers the click event on the element it's called upon, allowing any attached onclick event listeners to execute.
        // Behavior: When .click() is called on a submit button, it will simulate a user clicking that button. This can lead to a form submission if the button is of type="submit" and is part of a form, but it's not the primary function of .click(). It can also be used to trigger other actions on non-submit buttons, links, or other interactive elements.
        // Invocation: Can be invoked on any INTERACTIVE ELEMENT, e.g., document.getElementById('myButton').click().


// DIFFERENCE BETWEEN .click() AND .on('click', ...) IN JQUERY :
    // | Method                  | Syntax                                                | When to use                                              | Works on dynamic elements? |
    // | ----------------------- | ----------------------------------------------------- | -------------------------------------------------------- | -------------------------- |
    // | **`.click()`**          | `$('#btn').click(function() { ... })`                 | When the element already exists on page load             | ❌ No                       |
    // | **`.on('click', ...)`** | `$(document).on('click', '#btn', function() { ... })` | When elements might be created later (e.g., added by JS) | ✅ Yes                      |

    // ✅ Works only if the element with ID saveBtn already exists in the DOM at the time this code runs.
    // ⚠️ If you add new buttons later (for example, inside your displayData() function), .click() will not work for those new buttons — because the handler wasn’t attached when they were created.

    // | Step              | `.click()`              | `.on('click', ...)`                             |
    // | ----------------- | ----------------------- | ----------------------------------------------- |
    // | Attaches listener | Directly to the element | To a parent container                           |
    // | Checks at runtime | Element must exist now  | Works for future elements too                   |
    // | Event bubbling    | Not used                | Used to catch future events                     |
    // | Use case          | Static UI               | Dynamic UI (tables, AJAX, JS-generated content) |

    // | Feature                                            | `.click()` | `.on('click', ...)` |
    // | -------------------------------------------------- | ---------- | ------------------- |
    // | Simpler syntax                                     | ✅          | Slightly longer     |
    // | Works only on existing elements                    | ✅          | ❌                   |
    // | Works with dynamically added elements              | ❌          | ✅                   |
    // | Uses event delegation                              | ❌          | ✅                   |
    // | Recommended for tables, forms, AdminLTE dashboards | ❌          | ✅ ✅ ✅               |
    
    // ** Rule of Thumb ** :
        // If your HTML is created or refreshed by JavaScript, always use .on('click', ...).
        // If your HTML exists from the start, .click() is fine.

// VARIABLE DECLARATION IN JS :
    // Variable  ---  Declared  ---  As	Why
    // users	      const	         We mutate contents but never reassign the array.
    // editIndex	  let	         It changes depending on which row is being edited.
    // table	      const	         DataTable reference doesn’t change.

// '===' vs '==' operators in JavaScript :
    // Operator   -----   Name    -----   What it does
    //   ==	         Loose equality	      Compares values only — tries to convert types automatically before comparing; !! It might convert types automatically (which causes bugs) !!
    //   ===         Strict equality	  !! Compares BOTH value and type — no automatic type conversion

    // EXTRA INFO ABOUT AJAX REQUEST :
    // An AJAX request in JavaScript refers to a method for making asynchronous HTTP requests from a web page to a server without requiring a full page reload. AJAX stands for Asynchronous JavaScript And XML, although modern AJAX implementations frequently use JSON (JavaScript Object Notation) for data exchange instead of XML.
        // Key aspects of an AJAX request:
            // Asynchronous: This is the defining characteristic. The browser sends the request to the server in the background and continues executing other JavaScript code. It does not wait for the server's response before proceeding. When the response arrives, a specified callback function is executed to handle the data.
            // JavaScript-driven: AJAX requests are initiated and managed by JavaScript code running in the user's browser.
            // Partial page updates: The primary benefit of AJAX is the ability to update specific parts of a web page dynamically based on data received from the server, without refreshing the entire page. This leads to a more responsive and interactive user experience.
            // XMLHttpRequest object (or Fetch API): Traditionally, AJAX requests were made using the built-in XMLHttpRequest object. More recently, the Fetch API has become a popular and more modern alternative for making network requests in JavaScript.
        // **!! In essence, an AJAX request allows a web page to: !!**
            // Send data to a server.
            // Retrieve data from a server.
            // Update the content of the web page based on the server's response, all without interrupting the user's interaction with the page by forcing a full reload.
    // Modern Trends:
    // !! While XML was historically significant, JSON (JavaScript Object Notation) has largely replaced XML as the preferred data format for AJAX communication due to its lighter weight and closer integration with JavaScript. However, the core principles of asynchronous communication remain central to AJAX regardless of the data format used.

// SPLICE METHOD ( splice() ) :
// The splice() method in JavaScript is an array method used to change the contents of an array by removing or replacing existing elements and/or adding new elements in place. This method directly modifies the original array and returns a new array containing the deleted elements. 
// array.splice(start, deleteCount, item1, item2, ...)
    // start: The index at which to start changing the array. If start is greater than the array's length, start will be set to the array's length. If start is negative, it will begin that many elements from the end of the array.
    // deleteCount (optional): The number of elements to remove from start. If deleteCount is 0, no elements are removed. If deleteCount is omitted or greater than the number of elements remaining in the array starting from start, all elements from start to the end of the array will be deleted.
    // item1, item2, ... (optional): The elements to add to the array, starting at the start position. 
    // !! If no elements are specified, splice() only removes elements !!
    // EXAMPLES :
        // Removing elements:
            // let fruits = ["apple", "banana", "cherry", "date"];
            // let removed = fruits.splice(1, 2); // Removes 2 elements starting from index 1
            // console.log(fruits); // Output: ["apple", "date"]
            // console.log(removed); // Output: ["banana", "cherry"]
        // Adding elements:
            // let colors = ["red", "green", "blue"];
            // colors.splice(1, 0, "yellow", "orange"); // Adds "yellow" and "orange" at index 1, removes 0 elements
            // console.log(colors); // Output: ["red", "yellow", "orange", "green", "blue"]
        // Replacing elements:
            // let numbers = [1, 2, 3, 4, 5];
            // let replaced = numbers.splice(2, 1, 6, 7); // Replaces 1 element at index 2 with 6 and 7
            // console.log(numbers); // Output: [1, 2, 6, 7, 4, 5]
            // console.log(replaced); // Output: [3] 

// EXPLANATION OF THE .forEach() METHOD USED IN THE CODE :
// userData.forEach((user, index) => { ... })
    // This is a loop through the array userData.
    // user = each object in the array (e.g., { employeeId: 'E101', name: 'Miya', ... })
    // index = the current position in the array (0, 1, 2, ...)
    // Inside the loop, you append (+=) a <tr> (table row) for each user.
    // IT'S EXACTLY THE SAME AS THIS MANUAL FOR LOOP :
        // for (let index = 0; index < userData.length; index++) {
        // let user = userData[index];
        //  *code to run*
        // }

// const index = $(this).data('index');
    // $(this) wraps the clicked button in a jQuery object.
    // .data('index') reads the data-index attribute from the button (the attribute you printed into the HTML like data-index="3").
    // const index = stores that value in a constant named index. Typically this value is a number (0, 1, 2...). jQuery tries to parse numeric data- values to numbers; if you want to be safe you can coerce with Number($(this).data('index')) or parseInt(...).
    // Purpose: index tells the code which element of the userData array corresponds to the clicked row.

// Populating form fields with existing data
// Each of these lines writes the existing user data into the corresponding form input.
    // $('#nameValue').val(user.name);
        // Selector: #nameValue — selects the input element with id="nameValue".
        // .val(user.name) sets the input’s value to user.name. For example, the text box will show "Miya".
        // Using .val() is safer/cleaner than .text() for input fields.
    // $('#districtValue').val(user.district);
    // $('#posCodeValue').val(user.poscode);
    // $('#addressValue').val(user.address);
    // $('#employeeIdValue').val(user.employeeId);
        // Same pattern: set the appropriate input/select value to the value stored on the user object.
    // Notes / gotchas:
        // Make sure the IDs in your HTML match exactly (id="nameValue" etc.). If the element is a <select>, .val() will select the option with that value.
        // If any of the user.xxx values are undefined or null, the input will be set to an empty string.
        // If you expect user-supplied HTML, .val() will not interpret HTML markup (good for preventing script injection into inputs). But if you later insert these values into innerHTML, escape or sanitize them.
