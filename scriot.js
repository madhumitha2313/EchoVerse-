// Animated text effect
var words = [
    'Welcome to the future of AI conversation',
    'Experience next-generation language models',
    'Unlock the power of advanced neural networks',
    'Transform your ideas into reality',
    'Join the revolution of intelligent computing',
    'Where artificial intelligence meets human creativity'
];

var part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;

var wordflick = function () {
    setInterval(function () {
        if (forwards) {
            if (offset >= words[i].length) {
                ++skip_count;
                if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        } else {
            if (offset == 0) {
                forwards = true;
                i++;
                offset = 0;
                if (i >= len) {
                    i = 0;
                }
            }
        }
        part = words[i].substr(0, offset);
        if (skip_count == 0) {
            if (forwards) {
                offset++;
            } else {
                offset--;
            }
        }
        $('.word').text(part);
    }, speed);
};

// Document ready function
$(document).ready(function () {
    // Initialize text animation
    wordflick();
    
    // Modal functionality
    $('#signInBtn').click(function() {
        $('#signInModal').fadeIn(300);
    });
    
    $('#signUpBtn').click(function() {
        $('#signUpModal').fadeIn(300);
    });
    
    $('.close').click(function() {
        const modalId = $(this).data('modal');
        $('#' + modalId).fadeOut(300);
    });
    
    $(window).click(function(event) {
        if ($(event.target).hasClass('modal')) {
            $(event.target).fadeOut(300);
        }
    });
    
    // Switch between sign in and sign up
    $('#switchToSignUp').click(function(e) {
        e.preventDefault();
        $('#signInModal').fadeOut(300);
        setTimeout(() => $('#signUpModal').fadeIn(300), 300);
    });
    
    $('#switchToSignIn').click(function(e) {
        e.preventDefault();
        $('#signUpModal').fadeOut(300);
        setTimeout(() => $('#signInModal').fadeIn(300), 300);
    });

    // 🔐 Default login credentials
    const defaultEmail = "test@echoverse.com";
    const defaultPassword = "echopass123";

    // ✅ Sign In functionality
    $('#signInForm').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val().trim();
        const password = $(this).find('input[type="password"]').val().trim();

        if (email === defaultEmail && password === defaultPassword) {
            localStorage.setItem("user", JSON.stringify({ email }));
            window.location.href = "dashboard.html"; // Change as needed
        } else {
            alert("❌ Invalid email or password. Try again.");
        }
    });

    // ✅ Sign Up simulation
    $('#signUpForm').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val().trim();
        const password = $(this).find('input[type="password"]').val().trim();

        if (email && password.length >= 6) {
            localStorage.setItem("user", JSON.stringify({ email }));
            window.location.href = "dashboard.html"; // Change as needed
        } else {
            alert("❌ Please enter a valid email and a password (min 6 chars).");
        }
    });

    // 🧠 Google OAuth Placeholder
    $('#googleSignIn, #googleSignUp').click(function() {
        alert('🔐 Google OAuth integration would go here using Google Identity SDK.');
    });
});
