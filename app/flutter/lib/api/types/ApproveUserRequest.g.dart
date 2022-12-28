// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ApproveUserRequest.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApproveUserRequest _$ApproveUserRequestFromJson(Map<String, dynamic> json) =>
    ApproveUserRequest(
      follow_id: json['follow_id'] as String,
      group_id: json['group_id'] as String,
      encrypted_group_sym_key: json['encrypted_group_sym_key'] as String,
      own_key_id: json['own_key_id'] as String,
      encrypted_profile_sym_key: json['encrypted_profile_sym_key'] as String?,
    );

Map<String, dynamic> _$ApproveUserRequestToJson(ApproveUserRequest instance) =>
    <String, dynamic>{
      'follow_id': instance.follow_id,
      'group_id': instance.group_id,
      'encrypted_group_sym_key': instance.encrypted_group_sym_key,
      'own_key_id': instance.own_key_id,
      'encrypted_profile_sym_key': instance.encrypted_profile_sym_key,
    };
