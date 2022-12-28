// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'CreateGroupRequest.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreateGroupRequest _$CreateGroupRequestFromJson(Map<String, dynamic> json) =>
    CreateGroupRequest(
      sym_key: json['sym_key'] as String,
      name: json['name'] as String,
      is_default: json['is_default'] as bool,
    );

Map<String, dynamic> _$CreateGroupRequestToJson(CreateGroupRequest instance) =>
    <String, dynamic>{
      'sym_key': instance.sym_key,
      'name': instance.name,
      'is_default': instance.is_default,
    };
