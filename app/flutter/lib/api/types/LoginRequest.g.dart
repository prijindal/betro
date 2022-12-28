// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'LoginRequest.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LoginRequest _$LoginRequestFromJson(Map<String, dynamic> json) => LoginRequest(
      json['email'] as String,
      json['master_hash'] as String,
      json['device_display_name'] as String,
    );

Map<String, dynamic> _$LoginRequestToJson(LoginRequest instance) =>
    <String, dynamic>{
      'email': instance.email,
      'master_hash': instance.master_hash,
      'device_display_name': instance.device_display_name,
    };
