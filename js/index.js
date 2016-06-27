


document.addEventListener("deviceready", setupAds, false);


function setupAds(){
	
	document.removeEventListener("deviceready", setupAds, false);
	
	//alert("Set up started!");
	
	if (window.admob) {
            admob.setOptions({
                publisherId: "ca-app-pub-2368707628276094/5101851369",
                interstitialAdId: "ca-app-pub-2368707628276094/6578584564",
                bannerAtTop: false, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
                isTesting: false, // receiving test ads (do not test with real ads as your account will be banned)
                autoShowBanner: true, // auto show banners ad when loaded
                autoShowInterstitial: false // auto show interstitials ad when loaded
            });
			
			//alert("Set up Complete :)");
			
			admob.createBannerView();
			
			admob.requestInterstitialAd();

			
        }
	else{
			//alert("Problem with Admob Plugin :(");
	}
	

}




$(document).ready(function(){
	

ga_storage._trackPageview('Home',"Home Screen");




var valid = /^\d+$/;

	$('#verify-btn').addClass("disabled");
	
	
	// When verify button is clicked.
  $("#verify-btn").on("click", function(){
  
	
	var bankId = $("#BankId").val();
	var accountNumber = $("#account-number").val();
	
	if(valid.test(accountNumber) && accountNumber.length === 10){
			$(".loading-bar").show();
			
			$( ".form-element" ).slideUp( "slow", function() {
				
				$(".line").hide();
				
				$(".title").text("Please wait...");
				
				$(".title").css("margin-top","35%");
				
			})
			}

			
	// Url for api call is classified (I removed it), contact me if you need to test it.		
	var url = "";
	
	$("#verify-btn").addClass("disabled");
	
	
	var bankName = $("#BankId option:selected").text();
	
	$.getJSON( url, function(data){
	
		var response = $.parseJSON(data);
		$(".navbar-header").html("<span class='pull-left nav-2'> <a href='index.html'> <span class='glyphicon glyphicon-menu-left'> </span> SEARCH RESULT </a> </span>");
		
		if(response.name != ""){
			var searchStatus = "Found!".toUpperCase();
			var accountHolder = response.name.toUpperCase();
			var bankingInstitution = bankName.toUpperCase();
			var bankAccount = accountNumber;
			var footer = '<a href="https://www.facebook.com/sharer/sharer.php?u=https://play.google.com/store/apps/details?id=com.account.verifier.ng" class="btn btn-info btn-block btn-nice"><span class="glyphicon glyphicon-share"> </span>  Tell Others </a> <a href="https://play.google.com/store/apps/details?id=com.account.verifier.ng" class="btn btn-info btn-block  btn-nice"><span class="glyphicon glyphicon-thumbs-up"> </span> Rate Application </a> <a href="https://twitter.com/brainyfarm" class="btn btn-info btn-block btn-nice"><span class="glyphicon glyphicon-send"> </span> Follow on Twitter </a><a href="mailto:brainyfarm@gmail.com" class="btn btn-info btn-block btn-nice"><span class="glyphicon glyphicon-envelope"> </span> Contact Developer </a>';
			ga_storage._trackPageview("Success", bankingInstitution);

		}else{
			var searchStatus = "Not Found!".toUpperCase()
			var accountHolder = "Unable to Verify".toUpperCase();
			var bankingInstitution = "Unable to Verify".toUpperCase();
			var bankAccount = accountNumber;
			var footer = '<h3> SMS VERIFICATION &nbsp <br /> <small> &quot; VERIFY &lt;ACCOUNT NUMBER&gt;   &lt;BANK NAME&gt; &quot;   TO  08039170087 </small> <br />    </h3>   <a onclick="admob.showInterstitialAd()" href="http://196.6.103.15/numap/faces/PublicVerify.jsp" class="btn btn-block btn-info btn-lg btn-nice"><span class="glyphicon glyphicon-ok"> </span> NUBAN Validation </a>  <a href="mailto:brainyfarm@gmail.com" class="btn btn-info btn-block btn-lg btn-nice"><span class="glyphicon glyphicon-envelope"> </span> Contact Developer </a> ';
			ga_storage._trackPageview("Failure", bankName.toUpperCase());


		}
		
		$("#verify-btn").removeClass("disabled");
		
		
		//var resultHTML = '<h2 class="text-center"> Search Result </h2>';
		
		//var resultHTML = '<label class="text-center"> Status </span>';
		
		var resultHTML = '';	
		
		resultHTML += '';
		
		resultHTML += '<label class="text-center label-close"> Account Name </label>';
		
		resultHTML += '<h3 class="text-center result-text"> ' + accountHolder + '</h3>';		
		
		resultHTML += '<label class="text-center label-close"> Banking Institution </label>';
		
		resultHTML += '<h3 class="text-center result-text"> ' + bankingInstitution + '</h3>';
		
		
		resultHTML += '<label class="text-center label-close"> Account Number </label>';
		
		resultHTML += '<h3 class="text-center result-text"> ' + bankAccount + '</h3>';
		
		
		resultHTML += '<br /> ';
		resultHTML += footer;
		
		
		$(".loading-bar").hide();
		
		$( "#main" ).fadeOut( "fast", function() {

		
		$("#main").html(resultHTML);
		
		$( "#main" ).fadeIn( "slow", function() {
			
			
			setTimeout(function(){
				
				admob.showInterstitialAd();

				
			}, 4000)
			
		})
		
		
		});

		})
	
	
  })

  // When user types in account-number.
  $("#account-number").on("keyup change keydown", function(){


  if($("#account-number").val().length === 10 && valid.test($("#account-number").val())){
	
		$('#verify-btn').removeClass("disabled");
		
	}
	else{
			$('#verify-btn').addClass("disabled");
	}
	
	
  })
  
})
