
(function (b, o, i, l, e, r) {
    b.GoogleAnalyticsObject = l; b[l] || (b[l] =
        function () { (b[l].q = b[l].q || []).push(arguments) }); b[l].l = +new Date;
    e = o.createElement(i); r = o.getElementsByTagName(i)[0];
    e.src = '//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e, r)
}(window, document, 'script', 'ga'));
ga('create', 'UA-XXXXX-X', 'auto'); ga('send', 'pageview');

$("#lnkEmail").click(changeClass);

function changeClass() {
    if ($("i").hasClass('fa-chevron-down')) {
        $("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        // $("#spnEmailMore").css('display', 'inline-block');

        $("#spnEmailMore").slideDown();
    }
    else {
        $("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        $("#spnEmailMore").slideUp();
    }
}

var steps = {
    "Basic Info": {
        sectionElement: "#stepBasicInfo",
        headerSection: "Basic Info",
        progress: 16,
        progressCss: "progress-bar-scu"
    },
    "Identity": {
        sectionElement: "#stepIdentity",
        headerSection: "Identity",
        progress: 33,
        progressCss: "progress-bar-scu"
    },
    "VerifyIdentity": {
        sectionElement: "#stepVerifyIdentity",
        headerSection: "Identity",
        progress: 33,
        progressCss: "progress-bar-scu"
    },
    "Products": {
        sectionElement: "#stepProducts",
        headerSection: "Funding",
        progress: 50,
        progressCss: "progress-bar-scu"
    },
    "FundingOptions": {
        sectionElement: "#stepFundingOptions",
        headerSection: "Funding",
        progress: 50,
        progressCss: "progress-bar-scu"
    },
    "BankSelection": {
        sectionElement: "#stepBankSelection",
        headerSection: "Funding",
        progress: 50,
        progressCss: "progress-bar-scu"
    },
    "AccountSelection": {
        sectionElement: "#stepAccountSelection",
        headerSection: "Funding",
        progress: 50,
        progressCss: "progress-bar-scu"
    },
    "CardInformation": {
        sectionElement: "#stepCardInformation",
        headerSection: "Funding",
        progress: 50,
        progressCss: "progress-bar-scu"
    },
    "Review": {
        sectionElement: "#stepReview",
        headerSection: "Submission",
        progress: 67.8,
        progressCss: "progress-bar-scu"
    },
    "Submitting": {
        sectionElement: "#stepSubmitting",
        headerSection: "Submission",
        progress: 85,
        progressCss: "active progress-bar-striped progress-bar-animated"
    },
    "Success": {
        sectionElement: "#stepSuccess",
        headerSection: "Submission",
        progress: 100,
        progressCss: "progress-bar-scu"
    },
    "Error": {
        sectionElement: "#stepError",
        headerSection: "Submission",
        progress: 100,
        progressCss: "progress-bar-scu"
    }
}

ko.validation.init({
    'errorClass': 'has-error',
    'errorMessageClass': 'help-block'
});

function ViewModel() {
    var self = this;

    /*self.firstName = ko.observable().extend({
      required: true
    });
  
  
    self.lastName = ko.observable();
  */

    self.basicInfo = ko.validatedObservable({
        firstName: ko.observable().extend({
            required: true
        }),
        lastName: ko.observable().extend({
            required: true
        }),
        email: ko.observable().extend({
            required: true
        }),
        mobilePhoneNumber: ko.observable().extend({
            required: true
        }),
        jointAccount: ko.observable(false),
        employee: ko.observable(false)
    });

    self.validateAndTransition = function (validationGroup) {
    //Bypass validation for testing
        var valid = validationGroup.isValid();

        if (valid) return true;

        //Show errors
        validationGroup.errors.showAllMessages(true)

        //Prevent navigation
        return false;
    }


    self.currentStep = ko.observable("Basic Info");
    self.currentStepHeader = ko.observable("Basic Info");

    self.transitionTo = function (from, to) {
        //Validate
        if (!steps[from]) {
            console.log(from + " not valid");
            return;
        }
        if (!steps[to]) {
            console.log(to + " not valid");
            return;
        }

        //Progress Bar
        $("#stepProgressBar").width(steps[to].progress + '%');

        //Title
        $(steps[from].sectionElement + " .stepTitle").fadeOut(300, function () {
            $(steps[to].sectionElement + " .stepTitle").fadeIn(300);
        });

        //Content
        $(steps[from].sectionElement + " .stepContent").hide("slide", 300, function () {
            $(steps[to].sectionElement + " .stepContent").show("slide", { direction: 'right' }, 300);
        });

        self.currentStep(to);
        self.currentStepHeader(steps[to].headerSection);
    }

    self.initPageRouting = function () {
        //Init Page Routing
        window.location.hash = '';
        Path.root("#/Basic%20Info");
        Path.map("#/Basic%20Info").to(function () {
            console.log("Basic Info Route");
            self.transitionTo(self.currentStep(), "Basic Info");
        });

        Path.map("#/Identity").to(function () {
            console.log("Identity Route ");
            self.transitionTo(self.currentStep(), "Identity");
        });

        Path.map("#/VerifyIdentity").to(function () {
            console.log("VerifyIdentity Route ");
            self.transitionTo(self.currentStep(), "VerifyIdentity");
        });

        Path.map("#/Funding").to(function () {
            console.log("Funding Route ");
            self.transitionTo(self.currentStep(), "Funding");
        });

        Path.map("#/Products").to(function () {
            console.log("Products Route ");
            self.transitionTo(self.currentStep(), "Products");
        });

        Path.map("#/FundingOptions").to(function () {
            console.log("FundingOptions Route ");
            self.transitionTo(self.currentStep(), "FundingOptions");
        });

        Path.map("#/BankSelection").to(function () {
            console.log("BankSelection Route ");
            self.transitionTo(self.currentStep(), "BankSelection");
        });

        Path.map("#/AccountSelection").to(function () {
            console.log("AccountSelection Route ");
            self.transitionTo(self.currentStep(), "AccountSelection");
        });

        Path.map("#/CardInformation").to(function () {
            console.log("CardInformation Route ");
            self.transitionTo(self.currentStep(), "CardInformation");
        });

        Path.map("#/Review").to(function () {
            console.log("Review Route ");
            self.transitionTo(self.currentStep(), "Review");
        });

        Path.map("#/Submitting").to(function () {
            console.log("Submitting Route ");
            self.transitionTo(self.currentStep(), "Submitting");

            setTimeout(function () {
                self.transitionTo(self.currentStep(), "Success");
            }, 2000);
        });

        Path.map("#/Success").to(function () {
            console.log("Success Route ");
            self.transitionTo(self.currentStep(), "Success");
        });

        Path.map("#/Error").to(function () {
            console.log("Error Route ");
            self.transitionTo(self.currentStep(), "Error");
        });

        Path.listen();
    };

    self.initPageRouting();
}

var viewModel = new ViewModel();
$(function () {
    ko.applyBindings(viewModel);
})
