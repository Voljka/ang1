<center><h3>{{dict.provider_card}}</h3></center>

<div class="row">
	<div class="col-md-9">
		<div class="input-group">
			<span class="input-group-addon">{{dict.name}}</span>
			<input class="form-control" type="text" ng-model="providerName">
		</div>
	</div>
	<div class="col-md-3">
		<div class="input-group">
			<span class="input-group-addon">{{dict.country}}</span>
<!-- 			<select class="form-control" ng-model="providerCountry" ng-init="consumerGroup=consumerCurrentGroup">    -->
			<select class="form-control" ng-model="providerCountry">   
				<option ng-repeat="country in countries" ng-value="country._id">{{ country.name }}</option>	
			</select>
		</div>
	</div>
</div>
<br><br>
<div class="row">
	<center>
		<button class="btn btn-primary" ng-click="save()">{{ submitCaption }}</button>
		<button class="btn btn-warning" ng-click="backToList()">{{dict.cancel}}</button>	
	</center>
</div>