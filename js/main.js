var app = angular.module("zouXiu",["ui.router"]);

app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
	
	$stateProvider
		.state("guide",{//引导页
			url : "/guide",
			templateUrl : "./page/guide.html" 
		})
		.state("info",{//登录注册页
			url : "/info",
			templateUrl : "./page/info.html" 
		})
		.state("content",{//内容页
			url : "",
			templateUrl : "./page/content.html" 
		})
		.state("info.login",{//登录页
			url : "/login",
			templateUrl : "./page/login.html" ,
			controller : "inLogin"
		})
		.state("info.regist",{//注册页
			url : "/regist",
			templateUrl : "./page/regist.html",
			controller : "inRegist"
		})
		.state("content.home",{//首页
			url : "/home",
			templateUrl : "./page/home.html",
			controller:"conHome"
		})
		.state("content.goodsClass",{//分类
			url : "/goodsClass",
			templateUrl : "./page/goodsClass.html",
			controller:"conGoodsClass"
		})
		.state("content.shopCar",{//购物车
			url : "/shopCar",
			templateUrl : "./page/shopCar.html",
			controller:"conShopCar"
		})
		.state("content.show",{//我的秀
			url : "/show",
			templateUrl : "./page/show.html",
			controller:"conShow"
		})
		.state("content.more",{//更多
			url : "/more",
			templateUrl : "./page/more.html",
			controller:"conMore"
		})
		
	
}]);

app.controller("main",["$scope","$location","$window","$rootScope",function($scope,$location,$window,$rootScope){
	$scope.page = {//页面全局信息
		title : "走秀网",
		headerTxt : "商品首页",
		shopCarNumber : 0,
		userIsLogin : true,
		hasBack : false,//头部是否添加返回键
		hasShopCar : false,//头部是否添加购物车按钮
		hasCount : false,//头部是否添加结算按钮,
		pageId : "home",
		goPage : function(text){
			switch (text){
				case "back"://返回上一页
					$window.history.back();
					break;
				case "home"://首页
					$location.path("/home");
					break;
				case "goodsClass"://商品分类
					$location.path("/goodsClass");
					break;
				case "shopCar"://购物车
					$location.path("/shopCar");
					break;
				case "show"://我的秀
					$location.path("/show");
					break;
				case "more"://更多
					$location.path("/more");
					break;
				default:
					break;
			}
		},
		addChopCar : function(){//添加当前商品到购物车
			
		},
		countCar : function(){//购物车结算
			
		}
	};
	$rootScope.home = null;
}]);


//商品首页
app.controller("conHome",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
	$scope.page.pageId = "home";
	$scope.page.headerTxt = "首页";
	$scope.page.title = "走秀网--首页";
	$scope.page.hasBack = false;
	
	if(!$rootScope.home){
		$http.jsonp("http://datainfo.duapp.com/shopdata/getBanner.php?callback=JSON_CALLBACK").success(function(data){
			console.log("第一次请求");
			
			$rootScope.home = {};
			$rootScope.home.banner = data;
			for(var i in $rootScope.home.banner){
				$rootScope.home.banner[i].bannerImg = JSON.parse($rootScope.home.banner[i].goodsBenUrl)[0]; 
			}
			console.log($rootScope.home.banner);
		});
	}else{
		console.log("banner数据有值");
	}
	
	
}]);
//商品分类
app.controller("conGoodsClass", ["$scope", function($scope) {
	$scope.page.pageId = "goodsClass";
	$scope.page.headerTxt = "新品上市";
	$scope.page.title = "走秀网--商品分类";
	$scope.page.hasBack = false;
}]);

//购物车
app.controller("conShopCar", ["$scope", function($scope) {
	$scope.page.pageId = "shopCar";
	$scope.page.headerTxt = "购物车";
	$scope.page.title = "走秀网--购物车";
	$scope.page.hasBack = false;
}]);

//我的秀
app.controller("conShow", ["$scope", function($scope) {
	$scope.page.pageId = "show";
	$scope.page.headerTxt = "我的秀";
	$scope.page.title = "走秀网--我的秀";
	$scope.page.hasBack = false;
}]);

//更多
app.controller("conMore", ["$scope", function($scope) {
	$scope.page.pageId = "more";
	$scope.page.headerTxt = "更多";
	$scope.page.title = "走秀网--更多";
	$scope.page.hasBack = false;
}]);

//登录
app.controller("inLogin", ["$scope", function($scope) {
	console.log(321);
	$scope.page.headerTxt = "登录";
	$scope.page.title = "走秀网--登录";
	$scope.page.hasBack = true;
}]);

//注册
app.controller("inRegist", ["$scope", function($scope) {
	$scope.page.headerTxt = "注册";
	$scope.page.title = "走秀网--注册";
	$scope.page.hasBack = true;
}]);