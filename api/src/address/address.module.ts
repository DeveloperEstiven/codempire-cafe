import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/address/entities/address.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [TypeOrmModule.forFeature([AddressEntity, UserEntity])],
})
export class AddressModule {}
