import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class DomainValidator implements ValidatorConstraintInterface {
    validate(email: string, args: ValidationArguments) {
      const allowedDomains = ['gmail.com']; //daftar domain yang diizinkan , 'yourdomain.id', 'anotherdomain.com'
      if (email) {
        //  split('@') memecah alamat email menjadi dua bagian, 
        // yaitu bagian sebelum "@" (username) dan bagian setelah "@" (domain).
        const [, domain] = email.split('@');
        //mengecek apa domain sesuai dari daftar yg diizinkan
        return allowedDomains.includes(domain);
      }
      return false; 
    }
  
    defaultMessage(args: ValidationArguments) {
        if (args.constraints && Array.isArray(args.constraints)) {
          return `Email harus dari salah satu domain berikut: ${args.constraints.join(', ')}`;
        } else {
          return 'Batasan domain email tidak valid.';
        }
      }
      
  }
  