// This file contains all general functions used in the experiment
    var images = [];// Two images that are alternated in ordered to get the blinking effect of the spectrofluorimeter
    images[0] = "../../common_images/specfluor_on_redLight.png";
    images[1] = "../../common_images/specfluor_on_no_redLight.png";
    var x = 0;
    var y = 0;
    // Variables necessary to obtain motion of all the images
    var initial_top;
    var initial_left;
    var final_top;
    var final_left;
    var step;
    var elem;
    var img,img1;
    var id,id1;
    var type_of_movement;// Indicates upward or downward motion
    var turnon; // it is used to store the spectrometer table images.
    var sol_name; // Used to store the solution name
    // Variables used for graph validation
    var dropdown; // To select the scan mode from the dropdown menu.
    var input1, input2, input3;
    var video1,video2, video3, video4,
    video5, video6, video7, video8;
    var step_no=0; /*This variable is used to perform all the actions in the required sequence. 
                     Depending on the value of this variable the part of the method is called.*/
    var count = 0; /* This variable is used to perform the actions on the objects without distortions.
                      i.e., It make sures that one or more actions are not performed at a time. */ 

/*This method is called when the page is loaded. *
   First function helps in providing basic functionality to manual button and also sets the first set of instructions.
   Second function adds click events to elements as soon as the page loads.
   Third function adds mouse events to elements as soon as the page loads. */
window.onload = function(){ 
        initial_function();
        addclickEvents();
        mouseEvents();
}

function initial_function(){
        // Intial instruction to be followed
        document.getElementById("demo").innerHTML = "Step1:Prepare six standard quinine sulfate solutions of following concentrations: 0.0001, 0.001, 0.01, 0.05, 0.1 and 1 ppm (parts per million) quinine in 0.05 M H2SO4. These solutions are prepared via dilution from a 10 ppm quinine stock solution in 0.05 M H2SO4. To prepare the stock solution, first exactly 6 mg of quinine sulfate dihydrate is quantitatively transferred to a 500 mL volumetric flask, dissolved by adding 25 mL of 1 M H2SO4 and finally made up to the mark with deionized water. Quinine sulfate decomposes under light. Therefore, the stock solution should be made fresh for measurements and stored in brown bottles in a cool place. Here all the solutions, including an unknown concentration solution, are shown on a concentration bar. Note that the supplied unknown sample was made as follows. A 1 mL of tonic water sample (containing an unknown concentration of quinine sulfate) was diluted to the mark with aq. 0.05 M H2SO4 in a 100 mL volumetric flask.";
        var modal = document.getElementById('manual');
        // Get the button that opens the manual modal
        var btn = document.getElementById("manual_button");
        // Get the <span> element that closes the manual modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks the button, open the manual modal 
        btn.onclick = function() {
            modal.style.display = "block";
        }
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
}

// When user clicks on the Data button it redirects him to the page containing slideshows of the two graphs. 
function popitup(url) {
        // Opens a new browser window called newwindow. url specifies the URL of the page to open.
        newwindow=window.open(url,'name','height=390,width=350',"_parent");
        // Sets focus to the new window if the focus is on the previous page.
        if (window.focus) {
            newwindow.focus()
        }
        return false;
}

//This function is used to add click events to elements
function addclickEvents(){
        document.getElementById("reset_btn").addEventListener("click", function() {
            window.location.reload();
        }, false);
        document.getElementById("data_button").addEventListener("click", function() {
            popitup("slideshow.html");
        }, false);
        document.getElementById("slider").addEventListener("click", function() {
            setSolution();
        }, false);
        document.getElementById("round-bottom-flask").addEventListener("click", function() {
            moveFlask();
        }, false);
        document.getElementById("pipette").addEventListener("click", function() {
            movePipette();
        }, false);
        document.getElementById("cuvette").addEventListener("click", function() {
            moveCuvette();
        }, false);
        document.getElementById("comp_trans_button").addEventListener("click", function() {
            scan();
        }, false);
        document.getElementById("spectrolid_trans_button").addEventListener("click", function() {
            spectrofluorimeter();
        }, false);
        document.getElementById("spectrolid_trans_button1").addEventListener("click", function() {
            spectrofluorimeter();
        }, false);
        document.getElementById("power_trans_button").addEventListener("click", function() {
            changeImage(); showClock();
        }, false);
        document.getElementById("ok_btn").addEventListener("click", function() {
            okBtn();
        }, false);
        document.getElementById("select").addEventListener("click", function() {
            selectGraph();
        }, false);
        document.getElementById("disposegraph").addEventListener("click", function() {
            disposeGraph();
        }, false);
}

//This function is used to add mouse events to elements.
function mouseEvents(){
        document.getElementById("manual_button").addEventListener("mouseover", function(){
            this.src='../../common_images/hover_manual.png';
        });
        document.getElementById("manual_button").addEventListener("mouseout", function(){
            this.src='../../common_images/manual_button.png';
        });
        document.getElementById("data_button").addEventListener("mouseover", function(){
            this.src='../../common_images/hover_data.png';
        });
        document.getElementById("data_button").addEventListener("mouseout", function(){
            this.src='../../common_images/data_button.png';
        });
}

//This specifies the solution to be used when the input button is clicked
function setSolution(){
      sol_name = document.getElementById("slider").value;
      document.getElementById("round-bottom-flask").src = "images/flask-with-solution.png"
      document.getElementById("demo").innerHTML = "Step-No 2: Click on the volumetric flask containing anthracene solution to take it to the instrument table.";
}

// Call turnOn() method every 250ms
function changeImage(){
    setInterval("turnOn()", 250);
}

/*When the user switches on the spectrofluorimeter this method is called. Here the spectrofluorimeter image 
is changed continuously  to give the blinking light effect. The two images that are swapped is stored in 
images[]*/
function turnOn() {
        /* Make the power button hidden, once the button is clicked to ensure that the spectrofluorimeter runs 
        only for one click. */
        document.getElementById('power_trans_button').style.visibility = 'hidden';
        // Get the image
        img = document.getElementById('table_with_spec');
        // Change the source of the image 
        img.src = images[x];
        //increment x;
        x++;
        if(x >= images.length){
            x = 0;
        }
}

/*This method displays a timer which runs for 30 seconds. There exists two images which are hidden initailly; 
when this method is called they are made visible and the clock hand is made to rotate.  */
function showClock(){
        if(step_no==6 && count == 6){
            // Get the images.
            var context=document.getElementById('clockScreen');
            var hand =document.getElementById('clockHand');
            // Make the visiblility of the obtained images visible
            context.style.visibility='visible';
            hand.style.visibility="visible";
            // Rotate 'clockHand' using jQueryRotate.js
            var angle = 0;
            setInterval(function(){
                angle+=3;
                $('#clockHand').rotate(angle);
            },50);
            step_no++;
            //After 10 secs dispose clock
            setTimeout("removeClock()",3000);
        }
}

// After 30 seconds of display of the timer the visibility of clock is changed back to hidden.
function removeClock() {
        $('#clockHand, #clockScreen').remove();
        //Change to next intsruction to be followed.
        document.getElementById("demo").innerHTML = "Step-No 8: Click on the lid of sample chamber of the spectrofluorimeter to open it for placing the sample in the instrument";
        cursorPointers('power_trans_button', 'spectrolid_trans_button');
}

/* First time its called to open the spectrofluorimeter.
   Second time its called to close the spectrofluorimeter. */
function spectrofluorimeter(){
        if (step_no == 7){
            // Replace the spectrofluorimeter images with the open spectrofluorimeter images
            images[0] = "../../common_images/specfluor_open.png";
            images[1] = "../../common_images/specfluor_open1.png";
            document.getElementById("demo").innerHTML = "Step-No 9: Click on the cuvette to place it in the sample holder of the chamber.";
            cursorPointers('spectrolid_trans_button', 'cuvette');
            step_no++;
        }
        else if(step_no == 9 && count == 9){
            // Replace the spectrofluorimeter images with the closed spectrophotmeter images.
            images[0] = "../../common_images/specfluor_on_redLight.png";
            images[1] = "../../common_images/specfluor_on_no_redLight.png";
            if(sol_name == 0){
                document.getElementById("demo").innerHTML = "Step-No 11: To run the Excitation Spectral Scan, open the measurement set-up screen by clicking on the fluorescence measurement icon on the computer monitor."; 
            }
            else{
                document.getElementById('demo').innerHTML = "Step-No 11:  To run the Emission Spectral Scan of the sample, open the instrument set-up screen by clicking on the fluorescence measurement icon on the computer monitor."
            }
            cursorPointers('spectrolid_trans_button1','comp_trans_button');
            step_no++;
        }
}

// This method is used to display the elements which are used for data validation.
function scan(){
        //displays the data validation elements by clicking on the computer screen.
        if(step_no==10 && sol_name == 0){
            //To run the excitation scan mode.
            $(".data_validation, #mfs_form1, #scan").css("visibility", "visible");
            document.getElementById("demo").innerHTML = "Step-No 12: Select the Excitation Scan Mode on the screen. On the screen, enter the Emission wavelength: 450 nm, Excitation Start Wavelength: 270 nm and Excitation End wavelength: 500 nm. One chooses the Excitation Slit(nm) and Emission Slit(nm) values (here 5 nm/5 nm) and the scan speed value (here 'medium') also. ";            
            step_no++;
        }
        else if(step_no==13){
            //To run the emission scan mode.
            $(".data_validation, #mfs_form2, #scan").css("visibility", "visible");
            document.getElementById("demo").innerHTML = "Step-No 15: Select the Emission Scan Mode on the screen.On the screen, enter the Excitation wavelength: 350 nm, Emission Start Wavelength: 360 nm and Emission End wavelength: 600 nm. One chooses the Excitation Slit(nm) and Emission Slit(nm) values (here 5 nm/5 nm) and the scan speed value (here 'medium') also. ";
            step_no++;        
        }
        else if(step_no == 10 && sol_name == 1||2||3||4||5||6||7){
            $(".data_validation, #mfs_form2, #scan").css("visibility", "visible");
            document.getElementById("demo").innerHTML = "Step-No 12:On the screen, enter the Excitation wavelength: 350 nm, Emission Start Wavelength: 360 nm and Emission End wavelength: 600 nm. One chooses the Excitation Slit(nm) and Emission Slit(nm) values (here 5 nm/5 nm) and the scan speed value (here 'medium') also.";            
            step_no++;
        }
        cursorPointers('comp_trans_button', 'ok_btn');
}

//This method is used to select the specific graph from the dropdown menu.
function selectGraph() {
        dropdown = document.getElementById("select");
        dropdown.onchange = function(event){
           if(dropdown.value=="Emission" && step_no==11 && sol_name == 0){
                $("#select").html("<option value='Excitation'>Excitation</option><option value='Emission'>Emission</option>");
                alert("Select Excitation scan mode"); 
           }
           else if(dropdown.value=="Excitation" && step_no==14 && sol_name == 0){
                $("#select").html("<option value='Emission'>Emission</option><option value='Excitation'>Excitation</option>");
                alert("Select Emission scan mode");
           }
           else if(dropdown.value=="Excitation" && step_no==11 && sol_name == 1||2||3||4||5||6||7){
                 $("#select").html("<option value='Emission'>Emission</option><option value='Excitation'>Excitation</option>");
                 alert("Select Emission scan mode");
           }

        }
}

//Common instructions to be executed for a graph.
function graphValidation_steps(){
    cursorPointers('ok_btn', 'disposegraph');
    document.getElementById("demo").innerHTML = "Step-No 13:Click on the close button when the spectral scal is complete. In real operation, the scan data are stored in the computer. The instrument stores data and therefore asks for the Sample File name. One enters a file name to save the data.";
    step_no++;
}

//This method is used to validate the correct data and display particular graph.
function okBtn(){
        dropdown = document.getElementById("select");
        var input1 = document.getElementById("input1").value;
        var input2 = document.getElementById("input2").value;
        var input3 = document.getElementById("input3").value;
        video1 = document.getElementById("video1");
        video2 = document.getElementById("video2");
        video3 = document.getElementById("video3");
        video4 = document.getElementById("video4");
        video5 = document.getElementById("video5");
        video6 = document.getElementById("video6");
        video7 = document.getElementById("video7");
        video7 = document.getElementById("video7");
        video8 = document.getElementById("video8");
        //validation for the excitation scan mode.
        if(sol_name== 0 && input1 == 450 && input2 == 270 && input3 == 500 && step_no == 11){
                graphValidation_steps();
                $(".data_validation, #mfs_form1").css("visibility", "hidden");
                video1.style.visibility = "visible";
                video1.play();
        }
        else if(sol_name== 0 && input1 == 350 && input2 == 360 && input3 == 600 && step_no == 14 && dropdown.value == "Emission"){
                $(".data_validation, #mfs_form2").css("visibility", "hidden");
                graphValidation_steps();
                video2.style.visibility = "visible";
                video2.play();
        }
        else if(sol_name== 1 && input1 == 350 && input2 == 360 && input3 == 600 && dropdown.value == "Emission"){
                $(".data_validation, #mfs_form2").css("visibility", "hidden");
                graphValidation_steps();
                video3.style.visibility = "visible";
                video3.play();
        }
        else if(sol_name== 2 && input1 == 350 && input2 == 360 && input3 == 600 && dropdown.value == "Emission"){
                $(".data_validation, #mfs_form2").css("visibility", "hidden");
                graphValidation_steps();
                video4.style.visibility = "visible";
                video4.play();
        }
        else if(sol_name== 3 && input1 == 350 && input2 == 360 && input3 == 600 && dropdown.value == "Emission"){
                $(".data_validation, #mfs_form2").css("visibility", "hidden");
                graphValidation_steps();
                video5.style.visibility = "visible";
                video5.play();
        }
        else if(sol_name== 4 && input1 == 350 && input2 == 360 && input3 == 600 && dropdown.value == "Emission"){
                $(".data_validation, #mfs_form2").css("visibility", "hidden");
                graphValidation_steps();
                video6.style.visibility = "visible";
                video6.play();
        }
        else if(sol_name== 5 && input1 == 350 && input2 == 360 && input3 == 600 && dropdown.value == "Emission" ){
                $(".data_validation, #mfs_form2").css("visibility", "hidden");
                graphValidation_steps();
                video7.style.visibility = "visible";
                video7.play();
        }
        else if(sol_name== 6 && input1 == 350 && input2 == 360 && input3 == 600 && dropdown.value == "Emission"){
                $(".data_validation, #mfs_form2").css("visibility", "hidden");
                graphValidation_steps();
                video8.style.visibility = "visible";
                video8.play();
        }
        
        else{
                alert("Select Scanmode, EXWL,EM Start WL and EM End WL values");
        }
}

// This method makes the graph hidden once the video is played and close is pressed. 
function disposeGraph(){
        // After playing the graph plotting video close option is choosen, the background scan image and the video is hidden.
        if(step_no == 12 && sol_name == 0 ){
            $(".videos, #scan").css("visibility", "hidden");
            document.getElementById('demo').innerHTML = "Step-No 14:To run the Emission Spectral Scan of the sample, open the instrument set-up screen by clicking on the fluorescence measurement icon on the computer monitor.";
            step_no++;
            cursorPointers('disposegraph', 'comp_trans_button');
        }
        else {
            $(".videos, #scan").css("visibility", "hidden");
            document.getElementById('demo').innerHTML = "Step-No 14:Reset to start over the measurements for other concentrations.";
            document.getElementById('disposegraph').style.cursor = 'default';
        }
}
