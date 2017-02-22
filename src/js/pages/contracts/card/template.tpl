<div class="panel panel-info">
	<div class="panel-heading">{{dict.contract_of}} &quot;{{ consumer.name | toUnsafe }}&quot;</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">{{dict.contract_number}}</span>
					<input class="form-control" type="text" ng-model="contractNumber">
				</div>
			</div>
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">{{dict.signed_at}}</span>
					<input class="form-control" type="date" ng-model="signed_at">
				</div>
			</div>
		</div>
	</div>
</div>

<div class="panel panel-default">
	<div class="panel-body">
		<center>
			<button class="btn btn-primary" ng-click="save()">{{ submitCaption }}</button> 
			<button class="btn btn-warning" ng-click="backToList()">{{ dict.cancel}}</button>
		</center>
	</div>
</div>