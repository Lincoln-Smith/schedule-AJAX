$(document).ready(function () {
    const scheduleUrl = 'https://api.npoint.io/e166b2415356a201fc5e';

    const classTime = {
        1: { start: '8:24 AM', end: '9:31 AM' },
        2: { start: '9:36 AM', end: '10:43 AM' },
        3: { start: '10:48 AM', end: '11:55 AM' },
        4: { start: '12:41 PM', end: '1:48 PM' },
        5: { start: '1:53 PM', end: '3:00 PM' }
    };

    // A day schedule to be changed
    const baseSchedule = [
        { class: "Statistics", teacher: "Caruso/White", room: "A208" },
        { class: "Fine Art 2", teacher: "Fraser, Lauren", room: "D101" },
        { class: "Health 12", teacher: "Preston, Maggie", room: "C130" },
        { class: "BCC ENG121 The Writing Process", teacher: "Sauter, Matthew", room: "E111" },
        { class: "Leadership in Action", teacher: "McGeough, Kristin", room: "A113" }
    ];

    // scoot down each day
    const dayRotation = {
        A: 0,  
        B: 1, 
        C: 2,  
        D: 3,  
        E: 4,
        F: 5,
        G: 6
    };

    $('#submitDay').on('click', function () {
        const selectedDay = $('#dayInput').val().toUpperCase();

        if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(selectedDay)) {
            alert('Try again smart guy! Enter a day from A-G!');
            return;
        }

        $.ajax({
            url: scheduleUrl,
            method: 'GET',
            success: function () {
                $('#scheduleList').empty();

                // independent rotation
                const rotation = dayRotation[selectedDay] % 3; 


                const firstThreeBlocks = baseSchedule.slice(0, 3);
                const lastTwoBlocks = baseSchedule.slice(3);

              
                const rotatedFirstThree = firstThreeBlocks.slice(-rotation).concat(firstThreeBlocks.slice(0, -rotation));
                const rotatedLastTwo = lastTwoBlocks.slice(-rotation).concat(lastTwoBlocks.slice(0, -rotation));

                
                const finalSchedule = rotatedFirstThree.concat(rotatedLastTwo);


                finalSchedule.forEach((classItem, index) => {
                    const timeSlot = classTime[index + 1];

                    $('#scheduleList').append(`
                        <tr>
                            <td>Block ${index + 1}</td>
                            <td>${timeSlot.start} - ${timeSlot.end}</td>
                            <td>${classItem.class}</td>
                            <td>${classItem.teacher}</td>
                            <td>${classItem.room}</td>
                        </tr>
                    `);
                });
            },
        });
    });
});
