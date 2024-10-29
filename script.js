$(document).ready(function () {
    const scheduleUrl = 'https://api.npoint.io/e166b2415356a201fc5e';

    // Define the full bell schedule (fixed times for each block)
    const bellSchedule = {
        1: { start: '8:24 AM', end: '9:31 AM' },
        2: { start: '9:36 AM', end: '10:43 AM' },
        3: { start: '10:48 AM', end: '11:55 AM' },
        4: { start: '12:41 PM', end: '1:48 PM' },
        5: { start: '1:53 PM', end: '3:00 PM' }
    };

    // Base schedule for "A" day
    const baseSchedule = [
        { class: "Statistics", teacher: "Caruso/White", room: "A208" },
        { class: "Fine Art 2", teacher: "Fraser, Lauren", room: "D101" },
        { class: "Health 12", teacher: "Preston, Maggie", room: "C130" },
        { class: "BCC ENG121 The Writing Process", teacher: "Sauter, Matthew", room: "E111" },
        { class: "Leadership in Action", teacher: "McGeough, Kristin", room: "A113" }
    ];

    // Define rotation shifts based on letter day
    const dayRotation = {
        A: 0,  // No shift
        B: 1,  // Shift by 1
        C: 2,  // Shift by 2
        D: 3,  // Shift by 3
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

                // Get rotation amount for the day
                const rotation = dayRotation[selectedDay] % 3; // Only rotate within group sizes

                // Separate the schedule into two groups
                const firstThreeBlocks = baseSchedule.slice(0, 3);
                const lastTwoBlocks = baseSchedule.slice(3);

                // Rotate each group independently
                const rotatedFirstThree = firstThreeBlocks.slice(-rotation).concat(firstThreeBlocks.slice(0, -rotation));
                const rotatedLastTwo = lastTwoBlocks.slice(-rotation).concat(lastTwoBlocks.slice(0, -rotation));

                // Combine rotated groups
                const finalSchedule = rotatedFirstThree.concat(rotatedLastTwo);

                // Display the final combined schedule
                finalSchedule.forEach((classItem, index) => {
                    const timeSlot = bellSchedule[index + 1];

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
            error: function () {
                alert('Error loading schedule. Please check your JSON file URL.');
            }
        });
    });
});
