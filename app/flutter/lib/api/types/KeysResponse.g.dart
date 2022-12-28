// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'KeysResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

KeysResponse _$KeysResponseFromJson(Map<String, dynamic> json) => KeysResponse(
      json['sym_key'] as String,
      json['ecdh_max_keys'] as int,
      json['ecdh_unclaimed_keys'] as int,
    );

Map<String, dynamic> _$KeysResponseToJson(KeysResponse instance) =>
    <String, dynamic>{
      'ecdh_max_keys': instance.ecdh_max_keys,
      'ecdh_unclaimed_keys': instance.ecdh_unclaimed_keys,
      'sym_key': instance.sym_key,
    };
