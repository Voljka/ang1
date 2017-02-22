<center><h3>{{dict.consumer_card}}</h3></center>

<div class="row">
	<div class="col-md-9">
		<div class="input-group">
			<span class="input-group-addon">{{dict.name}}</span>
			<input class="form-control" type="text" ng-model="consumerName">
		</div>
	</div>
	<div class="col-md-3">
		<div class="input-group">
			<span class="input-group-addon">{{dict.group}}</span>
			<select class="form-control" ng-model="consumerGroup" ng-init="consumerGroup=consumerCurrentGroup">   
				<option ng-repeat="group in groups" ng-value="group._id">{{ group.name }}</option>	
			</select>
		</div>
	</div>
</div>
<br><br>
<div class="row">
	<center>
		<button class="btn btn-primary" ng-click="saveConsumer()">{{ submitCaption }}</button>
		<button class="btn btn-warning" ng-click="backToList()">{{dict.cancel}}</button>	
	</center>
</div>