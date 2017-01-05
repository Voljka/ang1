<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>#</td>
				<td>Name</td>
				<td>Group</td>
				<td>Country</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="consumer in consumers" ng-click="selectConsumer(consumer)">
				<td>--</td>
				<td> {{ consumer.name }}</td>
				<td> {{ consumer.group.name }}</td>
				<td> {{ consumer.country.name }}</td>
			</tr>
			
		</tbody>
	</table>
</div>