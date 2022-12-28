// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'RegisterRequest.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RegisterRequest _$RegisterRequestFromJson(Map<String, dynamic> json) =>
    RegisterRequest(
      username: json['username'] as String,
      email: json['email'] as String,
      master_hash: json['master_hash'] as String,
      sym_key: json['sym_key'] as String,
      inhibit_login: json['inhibit_login'] as bool? ?? false,
    );

Map<String, dynamic> _$RegisterRequestToJson(RegisterRequest instance) =>
    <String, dynamic>{
      'username': instance.username,
      'email': instance.email,
      'master_hash': instance.master_hash,
      'sym_key': instance.sym_key,
      'inhibit_login': instance.inhibit_login,
    };
