import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common"
//digunakan untuk mengacak password sebelum disimpan atau digunakan dalam aplikasi. 
import { hash } from "bcrypt" 

@Injectable()
export class TransformPasswordPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // menggunakan fungsi hash dari modul bcrypt untuk mengacak nilai password yang dikirimkan. 
    // Kita mengasumsikan bahwa objek value memiliki properti password, 
    // yang kemudian akan diacak dengan menggunakan algoritma hash dan ditimpa dengan nilai yang diacak.
    value.password = await hash(value.password, 12)
    //Setelah password diubah,transform() mengembalikan kembali objek value yang telah dimodifikasi,
    //sehingga nilai password yang telah diacak akan digunakan dalam proses selanjutnya.
    return value
  }
}