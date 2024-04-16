import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { SnackBarService } from '@core/services/snack-bar.service';
import { EncryptionService } from '@core/services/encryption.service';
import { StorageService } from '@core/services/storage.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let encryptionService: jasmine.SpyObj<EncryptionService>;
  let storageService: jasmine.SpyObj<StorageService>;
  let snackBarService: jasmine.SpyObj<SnackBarService>;

  beforeEach(() => {
    const encryptionServiceSpy = jasmine.createSpyObj('EncryptionService', ['encrypt', 'decrypt']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['get', 'set', 'clear', 'clear_all']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: EncryptionService,
          useValue: encryptionServiceSpy
        },
        {
          provide: StorageService,
          useValue: storageServiceSpy
        },
        {
          provide: SnackBarService,
          useValue: snackBarServiceSpy
        },
        provideHttpClientTesting()
      ]
    });
    const httpTesting = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    encryptionService = TestBed.inject(EncryptionService) as jasmine.SpyObj<EncryptionService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    snackBarService = TestBed.inject(SnackBarService) as jasmine.SpyObj<SnackBarService>;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});
