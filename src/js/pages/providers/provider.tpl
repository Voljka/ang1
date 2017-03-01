<div class="row">
	<div class="col-md-5">
		<input ng-model="providerFilter" type="text" ng-change="useFilter()" placeholder="{{dict.provider_name_filter}}">
		<br>
	</div>
</div>

<div class="row">
	<div class="col-md-6">
		<button class="btn btn-info" ng-click="add()">{{dict.add}}</button>
		<button class="btn btn-info" ng-if="current" ng-click="edit()">{{dict.modify}}</button>
<!-- 		<button class="btn btn-info" ng-if="current" ng-click="remove()">{{dict.remove}}</button> -->
	</div>
	<div class="col-md-6">
		<button class="btn btn-default" ng-if="current" ng-click="goBills()">{{dict.bills}}</button>
	</div>
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>{{dict.name}}</th>
				<th>{{dict.country}}</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-class="provider.selected ? 'item-selected' : ''" ng-repeat="provider in filteredObjects" ng-click="select(provider)">
				<td> {{ provider.name | toUnsafe }}</td>
				<td> {{ provider.country.name }}</td>
			</tr>
		</tbody>
	</table>
</div>