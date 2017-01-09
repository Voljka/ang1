<h3>Consumer Card</h3>
<input type="text" ng-model="consumerName">
<!-- <select ng-model="consumerGroup" ng-init="{{consumerCurrentGroup2}}">    -->
<select class="select" ng-model="consumerGroup" ng-init="consumerGroup=consumerCurrentGroup">   
	<option ng-repeat="group in groups" ng-value="group._id">{{ group.name }}</option>	
</select>

<button class="btn btn-primary" ng-click="saveConsumer()">{{ submitCaption }}</button>
<button class="btn btn-warning" ng-click="backToList()">Cancel</button>