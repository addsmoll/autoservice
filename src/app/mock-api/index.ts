import { inject, Injectable } from '@angular/core';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';

@Injectable({ providedIn: 'root' })
export class MockApiService {
      navigationMockApi = inject(NavigationMockApi);

}
